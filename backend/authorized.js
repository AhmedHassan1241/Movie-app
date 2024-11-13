const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).send("Invalid token.");
    }
    req.user = decoded; // Attach decoded user info to the request object
    next();
  });
}

module.exports = verifyToken;
