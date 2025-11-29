import bcrypt = require("bcryptjs");
import mongoose = require("mongoose");

const Admin = require("../models/admin");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const adminExists = await Admin.findOne({ email: "admin@bank.com" });

    if (adminExists) {
      console.log("Admin is exist");
      return;
    }

    await Admin.create({
      name: "admin",
      email: "admin@bank.com",
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
    });

    console.log("admin berhasil dibuat");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();
