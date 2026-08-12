const { prisma } = require("../config/db");

const subjects = [
  {
    id: 1,
    name: "CASA",
    resources: {
      notes: "https://drive.google.com/drive/folders/15ebGddCP0wFRiopMcEOkI1PeimWAfHXq",
      pyqs: "https://drive.google.com/drive/folders/example_pyqs_casa",
      practice: "https://drive.google.com/drive/folders/example_practice_casa"
    }
  },
  {
    id: 2,
    name: "DnT",
    resources: {
      notes: "https://drive.google.com/drive/folders/15TtiznXqjB3LL3ZyTlM0-fPYFc9uY6-i",
      pyqs: "https://drive.google.com/drive/folders/example_pyqs_dnt",
      practice: "https://drive.google.com/drive/folders/example_practice_dnt"
    }
  },
  {
    id: 3,
    name: "DECA",
    resources: {
      notes: "https://drive.google.com/drive/folders/15h_Vhd-CRpkphgVrVmIuCqv1hWRE9bUp",
      pyqs: "https://drive.google.com/drive/folders/example_pyqs_deca",
      practice: "https://drive.google.com/drive/folders/example_practice_deca"
    }
  },
  {
    id: 4,
    name: "FEE",
    resources: {
      notes: "https://drive.google.com/drive/folders/1OgSFEHN1mFIsnfrE97YT8bbTVNjb0RqP",
      pyqs: "https://drive.google.com/drive/folders/example_pyqs_fee",
      practice: "https://drive.google.com/drive/folders/example_practice_fee"
    }
  }
];

const mapSubjectResponse = (subject) => {
  if (!subject) return null;
  const { notes, pyqs, cho, assignments, importantQuestions, videoResources, ...rest } = subject;
  return {
    ...rest,
    resources: {
      notes: notes || [],
      pyqs: pyqs || [],
      cho: cho || [],
      assignments: assignments || [],
      importantQuestions: importantQuestions || [],
      videoResources: videoResources || []
    }
  };
};

// 🔹 GET all subjects
const getSubjects = (req, res) => {
  res.json(subjects);
};

// 🔹 GET all First Year Subjects from DB
const getFirstYearSubjects = async (req, res) => {
  try {
    const subjects = await prisma.firstYearSubject.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(subjects.map(mapSubjectResponse));
  } catch (error) {
    console.error("Error fetching first year subjects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 GET specific First Year Subject by slug
const getFirstYearSubjectBySlug = async (req, res) => {
  try {
    const subject = await prisma.firstYearSubject.findUnique({
      where: { slug: req.params.slug }
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(mapSubjectResponse(subject));
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 GET all Second Year Subjects from DB
const getSecondYearSubjects = async (req, res) => {
  try {
    const subjects = await prisma.secondYearSubject.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(subjects.map(mapSubjectResponse));
  } catch (error) {
    console.error("Error fetching second year subjects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 GET specific Second Year Subject by slug
const getSecondYearSubjectBySlug = async (req, res) => {
  try {
    const subject = await prisma.secondYearSubject.findUnique({
      where: { slug: req.params.slug }
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(mapSubjectResponse(subject));
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSubjects, getFirstYearSubjects, getFirstYearSubjectBySlug, getSecondYearSubjects, getSecondYearSubjectBySlug };