const subjects = [
 {
  id:1,
  name:"CASA",
  year:"year1",
  notes:"https://drive.google.com/drive/folders/15ebGddCP0wFRiopMcEOkI1PeimWAfHXq?usp=drive_link"
 },
 {
  id:2,
  name:"DnT",
    year:"year1",
  notes:"https://drive.google.com/drive/folders/15TtiznXqjB3LL3ZyTlM0-fPYFc9uY6-i"
 },
 {
  id:3,
  name:"DECA",
  year:"year1",
  notes:"https://drive.google.com/drive/folders/15h_Vhd-CRpkphgVrVmIuCqv1hWRE9bUp"
 },
 {
  id:4,
  name:"FEE",
  year:"year1",
  notes:"https://drive.google.com/drive/folders/1OgSFEHN1mFIsnfrE97YT8bbTVNjb0RqP"
}
];


const getSubjects = (req,res)=>{
 res.json(subjects);
};

module.exports = { getSubjects };