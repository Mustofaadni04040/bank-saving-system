import type e = require("express");
const Account = require("../models/accountModel");
const DepositoType = require("../models/depositoTypeModel");

const createAccount = async (req: e.Request, res: e.Response) => {
  const session = await Account.startSession();
  session.startTransaction();
  try {
    const customerId = req.customerId;

    const newAccount = await Account.create(
      [
        {
          customerId,
          balance: 0,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Account created successfully",
      account: newAccount[0],
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
  }
};

const setDepositoAccount = async (req: e.Request, res: e.Response) => {
  try {
    const { accountId } = req.params;
    const { depositoTypeId, packet } = req.body;
    const customerId = req.customerId;

    const account = await Account.findById(accountId).populate({
      path: "customerId",
      select: "_id name",
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (String(account.customerId._id) !== customerId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (account.depositoTypeId) {
      return res
        .status(400)
        .json({ message: "Deposito type already set for this account" });
    }

    const depositoType = await DepositoType.findById(depositoTypeId);

    if (!depositoType) {
      return res.status(404).json({ message: "Deposito type not found" });
    }

    const duplicateDeposito = await Account.findOne({
      customerId,
      depositoTypeId,
    });

    if (duplicateDeposito) {
      return res.status(400).json({
        message: "You already used this deposito type on another account",
      });
    }

    account.depositoTypeId = depositoTypeId;
    account.packet = `${packet} months`;

    await account.save();

    res.json({
      message: "Deposito opened successfully",
      account,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAccount = async (req: e.Request, res: e.Response) => {
  try {
    const { accountId } = req.params;
    const { depositoTypeId, packet } = req.body;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (depositoTypeId) account.depositoTypeId = depositoTypeId;
    if (packet) account.packet = packet;

    await account.save();

    return res.status(200).json({
      message: "Account updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createAccount, setDepositoAccount, updateAccount };
