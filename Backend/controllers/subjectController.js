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

// 🔹 GET all subjects
const getSubjects = (req, res) => {
  res.json(subjects);
};

module.exports = { getSubjects };