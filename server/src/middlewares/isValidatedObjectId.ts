const mongoose = require("mongoose");
import type e = require("express");

const isValidatedObjectId = (
  req: e.Request,
  res: e.Response,
  next: e.NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ID is not valid, please provide a valid ID",
      success: false,
    });
  }
  next();
};

module.exports = isValidatedObjectId;
