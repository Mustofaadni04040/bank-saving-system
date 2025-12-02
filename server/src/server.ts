import type e = require("express");
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const customerRoute = require("./routes/customerRoute");
const adminRoute = require("./routes/adminRoute");
const depositoTypeRoute = require("./routes/depositoTypeRoute");

require("dotenv").config();

const app = express();
app.use(express.json());
connectDB();
const allowedOrigins = [
  "http://localhost:5173",
  "https://seeker-snowy.vercel.app",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.some((o) => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/deposito-types", depositoTypeRoute);

app.get("/", (req: e.Request, res: e.Response) =>
  res.send("Bank Saving API is running")
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
