import type e = require("express");
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

require("dotenv").config();

const app = express();
app.use(express.json());
const corsOtions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOtions));

app.get("/", (req: e.Request, res: e.Response) =>
  res.send("Bank Saving API is running")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
