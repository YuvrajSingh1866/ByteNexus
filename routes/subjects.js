const express = require("express");
const router = express.Router();

const { getSubjects, getFirstYearSubjects, getFirstYearSubjectBySlug, getSecondYearSubjects, getSecondYearSubjectBySlug } = require("../controllers/subjectController");

router.get("/", getSubjects);
router.get("/first-year", getFirstYearSubjects);
router.get("/first-year/:slug", getFirstYearSubjectBySlug);
router.get("/second-year", getSecondYearSubjects);
router.get("/second-year/:slug", getSecondYearSubjectBySlug);

module.exports = router;