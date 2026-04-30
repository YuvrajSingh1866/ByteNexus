const protect = (req, res, next) => {
  console.log("SESSION CHECK:", req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
};

module.exports = protect;

