const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

//import routes
const userRoutes = require("./routes/user");

mongoose.connect(
  "mongodb://localhost:27017/nodeauth",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("mongodb connected");
  }
);

const app = express();

//middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json());
//routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(8000);
