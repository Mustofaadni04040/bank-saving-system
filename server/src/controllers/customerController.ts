import type e = require("express");
const Customer = require("../models/customerModel");
import bcrypt = require("bcryptjs");

const createCustomer = async (req: e.Request, res: e.Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Name and password are required" });
    }

    const customerExists = await Customer.findOne({ name });

    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Customer.create({
      name,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.log(error);
  }
};
