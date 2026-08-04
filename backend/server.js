require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const courseRoutes = require("./routes/courseRoutes")
let app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/course",courseRoutes);
let PORT = process.env.PORT || 9000;
app.listen(PORT,()=>console.log("I am listening"));