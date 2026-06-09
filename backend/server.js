const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

const connectDB = require("./config/db");

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expense"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
