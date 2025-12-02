import type e = require("express");
const Account = require("../models/accountModel");

const createAccount = async (req: e.Request, res: e.Response) => {
  const session = await Account.startSession();
  session.startTransaction();
  try {
    const customerId = req.customerId;

    const newAccount = await Account.create(
      [
        {
          customer: customerId,
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
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
  }
};
