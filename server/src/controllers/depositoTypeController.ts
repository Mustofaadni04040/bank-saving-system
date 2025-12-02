import type e = require("express");
const DepositoType = require("../models/depositoTypeModel");

const createDepositoType = async (req: e.Request, res: e.Response) => {
  try {
    const { name, yearlyReturn } = req.body;

    if (!name || !yearlyReturn) {
      return res
        .status(400)
        .json({ message: "Name and yearly return are required" });
    }

    const depositoTypeExists = await DepositoType.findOne({ name });

    if (depositoTypeExists) {
      return res.status(400).json({ message: "Deposito type already exists" });
    }

    await DepositoType.create({ name, yearlyReturn });

    return res.status(201).json({
      message: "Deposito type created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDepositoType,
};
