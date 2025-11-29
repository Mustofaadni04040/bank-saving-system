import type e = require("express");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: e.Request, res: e.Response) =>
  res.send("Bank Saving API is running")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
