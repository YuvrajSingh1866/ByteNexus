require("dotenv").config();
const { prisma } = require("./config/db");

const generateDummyResource = (title, type) => {
  const isVideo = type === "video";
  return {
    title,
    link: isVideo ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: isVideo ? "video" : "pdf"
  };
};

const subjectsData = [
  {
    name: "Artificial Intelligence and Machine Learning",
    slug: "artificial-intelligence-and-machine-learning",
    description: "Learn the fundamentals of AI, neural networks, and machine learning models.",
    resources: {
      notes: [generateDummyResource("Unit 1: Intro to AI", "pdf"), generateDummyResource("Unit 2: Supervised Learning", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("ML Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Top ML Interview Questions", "pdf")],
      videoResources: [generateDummyResource("AI Full Course", "video")]
    }
  },
  {
    name: "Computer Networks",
    slug: "computer-networks",
    description: "Understand the layers of network protocols, routing, and network security.",
    resources: {
      notes: [generateDummyResource("OSI Model", "pdf"), generateDummyResource("TCP/IP", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Subnetting Assignment", "pdf")],
      importantQuestions: [generateDummyResource("Important Topics", "pdf")],
      videoResources: [generateDummyResource("Computer Networks Playlist", "video")]
    }
  },
  {
    name: "Computer Organization and Architecture",
    slug: "computer-organization-and-architecture",
    description: "Deep dive into CPU design, memory hierarchy, and pipelining.",
    resources: {
      notes: [generateDummyResource("Microarchitecture", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Design Problems", "pdf")],
      videoResources: [generateDummyResource("COA Playlist", "video")]
    }
  },
  {
    name: "Data Structures and Algorithms",
    slug: "data-structures-and-algorithms",
    description: "Master essential algorithms and data structures to optimize code.",
    resources: {
      notes: [generateDummyResource("Arrays & Strings", "pdf"), generateDummyResource("Trees & Graphs", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Linked List Assignment", "pdf")],
      importantQuestions: [generateDummyResource("Top 100 LeetCode Questions", "pdf")],
      videoResources: [generateDummyResource("DSA Full Course", "video")]
    }
  },
  {
    name: "Database Management System",
    slug: "database-management-system",
    description: "Learn relational models, SQL, normalization, and database design.",
    resources: {
      notes: [generateDummyResource("SQL Basics", "pdf"), generateDummyResource("Normalization", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("SQL Queries Assignment", "pdf")],
      importantQuestions: [generateDummyResource("Interview Questions", "pdf")],
      videoResources: [generateDummyResource("DBMS Full Course", "video")]
    }
  },
  {
    name: "Discrete Structures",
    slug: "discrete-structures",
    description: "Mathematical foundations of computer science, logic, and set theory.",
    resources: {
      notes: [generateDummyResource("Set Theory", "pdf"), generateDummyResource("Graph Theory", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Assignment 1", "pdf")],
      importantQuestions: [generateDummyResource("Important Proofs", "pdf")],
      videoResources: [generateDummyResource("Discrete Math Course", "video")]
    }
  },
  {
    name: "Embedded System and Internet of Things",
    slug: "embedded-system-and-internet-of-things",
    description: "Explore microcontrollers, sensors, and IoT architecture.",
    resources: {
      notes: [generateDummyResource("IoT Architecture", "pdf"), generateDummyResource("Microcontrollers", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Arduino Project", "pdf")],
      importantQuestions: [generateDummyResource("Important Topics", "pdf")],
      videoResources: [generateDummyResource("IoT Crash Course", "video")]
    }
  },
  {
    name: "Front End Engineering II",
    slug: "front-end-engineering-ii",
    description: "Advanced frontend concepts using modern frameworks like React.",
    resources: {
      notes: [generateDummyResource("React Hooks", "pdf"), generateDummyResource("State Management", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("React Project", "pdf")],
      importantQuestions: [generateDummyResource("Frontend Interview Qs", "pdf")],
      videoResources: [generateDummyResource("React Full Course", "video")]
    }
  },
  {
    name: "Linux",
    slug: "linux",
    description: "Command line operations, shell scripting, and system administration.",
    resources: {
      notes: [generateDummyResource("Linux Commands", "pdf"), generateDummyResource("Shell Scripting", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Bash Script Assignment", "pdf")],
      importantQuestions: [generateDummyResource("Important Commands", "pdf")],
      videoResources: [generateDummyResource("Linux Crash Course", "video")]
    }
  },
  {
    name: "Object Oriented Software Engineering",
    slug: "object-oriented-software-engineering",
    description: "Software development lifecycles, UML diagrams, and design patterns.",
    resources: {
      notes: [generateDummyResource("SDLC Models", "pdf"), generateDummyResource("UML Diagrams", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("Class Diagram Assignment", "pdf")],
      importantQuestions: [generateDummyResource("Design Patterns", "pdf")],
      videoResources: [generateDummyResource("OOSE Playlist", "video")]
    }
  },
  {
    name: "Problem Solving Using CPP",
    slug: "problem-solving-using-cpp",
    description: "Advanced problem solving and object-oriented programming with C++.",
    resources: {
      notes: [generateDummyResource("C++ OOP", "pdf"), generateDummyResource("STL Guidelines", "pdf")],
      pyqs: [generateDummyResource("2023 PYQ", "pdf")],
      cho: [generateDummyResource("CHO 1", "pdf")],
      assignments: [generateDummyResource("CPP Practice Problems", "pdf")],
      importantQuestions: [generateDummyResource("Important Concepts", "pdf")],
      videoResources: [generateDummyResource("C++ Full Course", "video")]
    }
  },
  {
    name: "UCA Guide",
    slug: "uca-guide",
    description: "Guidance for university counseling and academic planning.",
    resources: {
      notes: [generateDummyResource("Career Paths", "pdf")],
      pyqs: [],
      cho: [],
      assignments: [],
      importantQuestions: [generateDummyResource("FAQs", "pdf")],
      videoResources: [generateDummyResource("UCA Session", "video")]
    }
  }
];

const mapSubjectData = (subject) => ({
  name: subject.name,
  slug: subject.slug,
  description: subject.description,
  notes: subject.resources.notes,
  pyqs: subject.resources.pyqs,
  cho: subject.resources.cho,
  assignments: subject.resources.assignments,
  importantQuestions: subject.resources.importantQuestions,
  videoResources: subject.resources.videoResources
});

const createSecondYearSubject = async (subject) => {
  await prisma.secondYearSubject.create({ data: mapSubjectData(subject) });
};

const seedDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database...");

    await prisma.secondYearSubject.deleteMany();
    console.log("Cleared existing second year subjects...");

    for (const subject of subjectsData) {
      await createSecondYearSubject(subject);
    }

    console.log("Successfully seeded second year subjects!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
