import type e = require("express");
const jwt = require("jsonwebtoken");
const adminAuth = (req: e.Request, res: e.Response, next: e.NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (decode.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden, you don't have permission to access this route",
      });
    }
    req.adminId = decode.adminId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuth;
