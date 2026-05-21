const { prisma } = require("../config/db");

const mapSubjectResponse = (subject) => {
  if (!subject) return null;

  return {
    ...subject,
    resources: {
      notes: subject.notes || [],
      pyqs: subject.pyqs || [],
      cho: subject.cho || [],
      assignments: subject.assignments || [],
      importantQuestions: subject.importantQuestions || [],
      videoResources: subject.videoResources || []
    }
  };
};

// GET all subjects
const getSubjects = async (req, res) => {
  try {
    const first = await prisma.firstYearSubject.findMany();
    const second = await prisma.secondYearSubject.findMany();

    res.json([
      ...first.map(mapSubjectResponse),
      ...second.map(mapSubjectResponse)
    ]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET first year subjects
const getFirstYearSubjects = async (req, res) => {
  try {
    const subjects = await prisma.firstYearSubject.findMany();

    res.json(subjects.map(mapSubjectResponse));
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET first year subject by slug
const getFirstYearSubjectBySlug = async (req, res) => {
  try {
    const subject = await prisma.firstYearSubject.findUnique({
      where: { slug: req.params.slug }
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.json(mapSubjectResponse(subject));

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET second year subjects
const getSecondYearSubjects = async (req, res) => {
  try {
    const subjects = await prisma.secondYearSubject.findMany();

    res.json(subjects.map(mapSubjectResponse));

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET second year subject by slug
const getSecondYearSubjectBySlug = async (req, res) => {
  try {
    const subject = await prisma.secondYearSubject.findUnique({
      where: { slug: req.params.slug }
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.json(mapSubjectResponse(subject));

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getSubjects,
  getFirstYearSubjects,
  getFirstYearSubjectBySlug,
  getSecondYearSubjects,
  getSecondYearSubjectBySlug
};