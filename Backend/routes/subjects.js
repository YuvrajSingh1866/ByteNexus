const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { prisma } = require("../config/db");
const { getSubjects, getFirstYearSubjects, getFirstYearSubjectBySlug, getSecondYearSubjects, getSecondYearSubjectBySlug } = require("../controllers/subjectController");

// multer storage
const uploadsDir = path.join(__dirname, "..", "public", "uploads");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadsDir);
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
		cb(null, unique);
	}
});

const upload = multer({ storage });

router.get("/", getSubjects);
router.get("/first-year", getFirstYearSubjects);
router.get("/first-year/:slug", getFirstYearSubjectBySlug);
router.get("/second-year", getSecondYearSubjects);
router.get("/second-year/:slug", getSecondYearSubjectBySlug);

// POST /api/subjects/upload
// fields: year (first|second), name, slug, description, resourceType (notes|pyqs|cho|assignments|importantQuestions|videoResources), title
router.post("/upload", upload.single("file"), async (req, res) => {
	try {
		const { year, name, slug, description, resourceType, title, resourceLink } = req.body;

		if (!year || !["first","second"].includes(year)) {
			return res.status(400).json({ message: "Invalid year. Use 'first' or 'second'." });
		}

		const file = req.file;
		const baseUrl = process.env.BACKEND_URL || `http://localhost:5001`;
		const link = file ? `${baseUrl}/uploads/${file.filename}` : (resourceLink || null);

		const resource = {
			title: title || (file ? file.originalname : "uploaded resource"),
			link,
			type: file ? (path.extname(file.originalname).replace('.', '') || 'file') : (req.body.type || 'link')
		};

		const model = year === "first" ? prisma.firstYearSubject : prisma.secondYearSubject;

		// upsert: add subject if not exists, otherwise push resource into specified array
		const arrayField = resourceType || 'notes';

		// If subject exists, push to array
		const existing = await model.findUnique({ where: { slug } });

		if (existing) {
			const updateData = {};
			updateData[arrayField] = { push: resource };
			await model.update({ where: { slug }, data: updateData });
			return res.json({ message: 'Resource added to subject' });
		}

		// create new subject
		const createData = {
			name,
			slug,
			description: description || '',
			notes: [],
			pyqs: [],
			cho: [],
			assignments: [],
			importantQuestions: [],
			videoResources: []
		};

		createData[arrayField] = [resource];

		await model.create({ data: createData });

		res.json({ message: 'Subject created and resource added' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

module.exports = router;