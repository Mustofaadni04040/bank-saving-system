import type e = require("express");
const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");

const depositTransaction = async (req: e.Request, res: e.Response) => {
  const session = await Transaction.startSession();
  session.startTransaction();
  try {
    const customerId = req.customerId;
    const { accountId } = req.params;
    const { amount, depositDate } = req.body;

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (String(account.customerId) !== customerId) {
      return res.status(403).json({
        message: "You don't have permission to deposit to this account",
      });
    }

    const startingBalance = account.balance;
    const endingBalance = startingBalance + amount;

    account.balance = endingBalance;
    await account.save({ session });

    const newTransaction = await Transaction.create(
      [
        {
          accountId,
          type: "deposit",
          amount,
          date: new Date(depositDate),
          startingBalance,
          endingBalance,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Deposit successful",
      transaction: newTransaction[0],
    });
  } catch (error) {
    console.log(error);
  }
};

const withdrawTransaction = async (req: e.Request, res: e.Response) => {
  const session = await Transaction.startSession();
  session.startTransaction();
  try {
    const customerId = req.customerId;
    const { accountId } = req.params;
    const { amount, date } = req.body;

    const account = await Account.findById(accountId)
      .populate("depositoTypeId")
      .session(session);

    console.log(account, "account");

    if (!account) return res.status(404).json({ message: "Account not found" });

    if (String(account.customerId) !== customerId) {
      return res.status(403).json({
        message: "You don't have permission to withdraw from this account",
      });
    }

    const deposito = account.depositoTypeId;
    console.log(deposito, "deposito");

    const monthlyReturn = deposito.yearlyReturn / 100 / 12;
    console.log(monthlyReturn, "monthlyReturn");

    const lastTransaction = await Transaction.findOne({ accountId })
      .sort({ createdAt: -1 })
      .session(session);

    console.log(lastTransaction, "lastTransaction");

    const lastDate = lastTransaction ? lastTransaction.date : account.openedAt;

    console.log(lastDate, "lastDate");

    const withdrawDate = new Date(date);

    const monthPassed =
      (withdrawDate.getFullYear() - lastDate.getFullYear()) * 12 +
      (withdrawDate.getMonth() - lastDate.getMonth());

    console.log(withdrawDate, "withdrawDate");
    console.log(monthPassed, "monthPassed");

    if (monthPassed < 0)
      return res.status(400).json({ message: "Invalid date" });

    const startingBalance = lastTransaction
      ? lastTransaction.endingBalance
      : account.balance;
    console.log(startingBalance, "startingBalance");

    const interestEarned = startingBalance * monthPassed * monthlyReturn;
    console.log(interestEarned, "interestEarned");

    const endingBalance = startingBalance + interestEarned - amount;
    console.log(endingBalance, "endingBalance");

    if (endingBalance < 0)
      return res.status(400).json({ message: "Insufficient balance" });

    account.balance = endingBalance;
    await account.save({ session });

    const newTransaction = await Transaction.create(
      [
        {
          accountId,
          type: "withdraw",
          amount,
          date: withdrawDate,
          startingBalance,
          endingBalance: account.balance,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.json({
      message: "Withdraw success",
      transaction: newTransaction[0],
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllTransactions = async (req: e.Request, res: e.Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const transactions = await Transaction.find()
      .populate("accountId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(Number(limit) * (Number(page) - 1));

    const count = await Transaction.countDocuments();

    res.json({
      transactions,
      pages: Math.ceil(count / Number(limit)),
      total: count,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTransactionsByCustomerId = async (req: e.Request, res: e.Response) => {
  try {
    const customerId = req.customerId;
    const { accountId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (String(account.customerId) !== customerId) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this account" });
    }

    const transactions = await Transaction.find({ accountId })
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip(Number(limit) * (Number(page) - 1));

    if (!transactions) {
      return res.status(404).json({ message: "Transactions not found" });
    }

    const count = await Transaction.countDocuments({ accountId });

    res.json({
      transactions,
      pages: Math.ceil(count / Number(limit)),
      total: count,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  depositTransaction,
  withdrawTransaction,
  getAllTransactions,
  getTransactionsByCustomerId,
};
