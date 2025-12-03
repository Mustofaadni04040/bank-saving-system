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

module.exports = { depositTransaction };
