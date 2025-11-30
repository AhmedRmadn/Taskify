const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Missing token" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId, 
    };
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
