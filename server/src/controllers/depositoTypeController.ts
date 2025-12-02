import type e = require("express");
const DepositoType = require("../models/depositoTypeModel");
const Account = require("../models/accountModel");

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

const getAllDepositoTypes = async (req: e.Request, res: e.Response) => {
  try {
    const depositoTypes = await DepositoType.find();

    return res.status(200).json({
      depositoTypes,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateDepositoType = async (req: e.Request, res: e.Response) => {
  try {
    const depositoTypeId = req.params.id;
    const { name, yearlyReturn } = req.body;

    const depositoType = await DepositoType.findById(depositoTypeId);

    if (!depositoType) {
      return res.status(404).json({ message: "Deposito type not found" });
    }

    if (name) depositoType.name = name;
    if (yearlyReturn) depositoType.yearlyReturn = yearlyReturn;

    await depositoType.save();

    return res.status(200).json({
      message: "Deposito type updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteDepositoType = async (req: e.Request, res: e.Response) => {
  try {
    const depositoTypeId = req.params.id;

    const isUsedDepositoType = await Account.exists({ depositoTypeId });

    if (isUsedDepositoType) {
      return res.status(400).json({
        message: "Cannot delete, deposito is in used by existing accounts",
      });
    }

    await DepositoType.findByIdAndDelete(depositoTypeId);

    res.json({ message: "Deposito Type deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDepositoType,
  getAllDepositoTypes,
  updateDepositoType,
  deleteDepositoType,
};
