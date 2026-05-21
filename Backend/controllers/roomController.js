const FirstYearSubject = require("../models/FirstYearSubject");
const SecondYearSubject = require("../models/SecondYearSubject");

const mapSubjectResponse = (subject) => {
  if (!subject) return null;

  return {
    ...subject._doc,
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
    const first = await FirstYearSubject.find();
    const second = await SecondYearSubject.find();

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
    const subjects = await FirstYearSubject.find();

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
    const subject = await FirstYearSubject.findOne({
      slug: req.params.slug
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
    const subjects = await SecondYearSubject.find();

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
    const subject = await SecondYearSubject.findOne({
      slug: req.params.slug
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