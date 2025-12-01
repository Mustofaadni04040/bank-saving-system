import type e = require("express");
const Customer = require("../models/customerModel");
import bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginCustomer = async (req: e.Request, res: e.Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Name and password are required" });
    }

    const customer = await Customer.findOne({ name });

    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, customer.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password, try again" });
    }

    const tokenData = {
      customerId: customer._id,
      role: "customer",
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({ name: customer.name, token, success: true });
  } catch (error) {
    console.log(error);
  }
};

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

    return res
      .status(201)
      .json({ message: "Customer created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async (req: e.Request, res: e.Response) => {
  try {
    const customerId = req.customerId;
    const { name } = req.body;

    const customer = await Customer.findById(customerId);

    console.log(customer, "customer");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (name) customer.name = name;

    await customer.save();

    return res
      .status(200)
      .json({ message: "Customer updated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginCustomer, createCustomer, updateCustomer };
