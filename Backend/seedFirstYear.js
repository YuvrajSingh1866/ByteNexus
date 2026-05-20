require("dotenv").config();
const mongoose = require("mongoose");
const FirstYearSubject = require("./models/FirstYearSubject");

const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bytenexus";

const generateDummyResource = (title, type) => {
  const isVideo = type === "video";
  return {
    title: title,
    link: isVideo ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: isVideo ? "video" : "pdf"
  };
};

const subjectsData = [
  {
    name: "Modern and Computational Physics",
    slug: "modern-and-computational-physics",
    description: "Learn the fundamentals of physics with computational applications.",
    resources: {
      notes: [generateDummyResource("Unit 1 Notes", "pdf"), generateDummyResource("Unit 2 Notes", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf"), generateDummyResource("2022 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Important Topics", "pdf")],
      videoResources: [generateDummyResource("Lecture 1 - Introduction", "video"), generateDummyResource("Lecture 2 - Quantum Mechanics", "video")]
    }
  },
  {
    name: "Python Programming",
    slug: "python-programming",
    description: "Master Python programming from basics to advanced concepts.",
    resources: {
      notes: [generateDummyResource("Basics of Python", "pdf"), generateDummyResource("Data Structures", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1: Logic Building", "pdf")],
      importantQuestions: [generateDummyResource("Top 50 Interview Questions", "pdf")],
      videoResources: [generateDummyResource("Python Full Course", "video")]
    }
  },
  {
    name: "Source Management",
    slug: "source-management",
    description: "Version control and collaborative development using Git and GitHub.",
    resources: {
      notes: [generateDummyResource("Git Basics", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [],
      assignments: [generateDummyResource("GitHub Repository Setup", "pdf")],
      importantQuestions: [generateDummyResource("Common Git Commands", "pdf")],
      videoResources: [generateDummyResource("Git & GitHub Crash Course", "video")]
    }
  },
  {
    name: "Calculus and Statistics",
    slug: "calculus-and-statistics",
    description: "Mathematical foundations for computer science and engineering.",
    resources: {
      notes: [generateDummyResource("Derivatives", "pdf"), generateDummyResource("Integrals", "pdf"), generateDummyResource("Probability", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf"), generateDummyResource("2022 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Formula Sheet", "pdf")],
      videoResources: [generateDummyResource("Calculus Fundamentals", "video"), generateDummyResource("Stats for ML", "video")]
    }
  },
  {
    name: "Differential Equations and Transformations",
    slug: "differential-equations-and-transformations",
    description: "Advanced mathematical techniques for engineering problem-solving.",
    resources: {
      notes: [generateDummyResource("Laplace Transforms", "pdf"), generateDummyResource("Fourier Series", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Important Proofs", "pdf")],
      videoResources: [generateDummyResource("Laplace Transform Intro", "video")]
    }
  },
  {
    name: "Digital Electronics and Computer Architecture",
    slug: "digital-electronics-and-computer-architecture",
    description: "Understand the hardware building blocks of computer systems.",
    resources: {
      notes: [generateDummyResource("Logic Gates", "pdf"), generateDummyResource("K-Maps", "pdf"), generateDummyResource("Microprocessors", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf"), generateDummyResource("2022 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1: Logic Design", "pdf")],
      importantQuestions: [generateDummyResource("Design Problems", "pdf")],
      videoResources: [generateDummyResource("Computer Architecture Playlist", "video")]
    }
  },
  {
    name: "Operating System",
    slug: "operating-system",
    description: "Learn the fundamentals of operating systems, process management, memory management, and file systems.",
    resources: {
      notes: [generateDummyResource("Unit 1 Notes", "pdf"), generateDummyResource("Unit 2 Notes", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf"), generateDummyResource("2022 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Important Topics", "pdf")],
      videoResources: [generateDummyResource("Lecture 1 - Intro to OS", "video"), generateDummyResource("Lecture 2 - Processes", "video")]
    }
  },
  {
    name: "UCA Guidance",
    slug: "uca-guidance",
    description: "Guidance and resources for University Counseling and Advising to help you navigate your academic journey.",
    resources: {
      notes: [generateDummyResource("Guidance Overview", "pdf")],
      pyqs: [],
      cho: [],
      assignments: [],
      importantQuestions: [generateDummyResource("FAQs", "pdf")],
      videoResources: [generateDummyResource("Orientation Video", "video")]
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Clear existing
    await FirstYearSubject.deleteMany();
    console.log("Cleared existing first year subjects...");

    // Insert new
    await FirstYearSubject.insertMany(subjectsData);
    console.log("Successfully seeded first year subjects!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
