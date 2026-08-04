require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/authRoutes")
let app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
let PORT = process.env.PORT || 9000;
app.listen(PORT,()=>console.log("I am listening"));