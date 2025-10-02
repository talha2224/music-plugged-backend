const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const combineRouter = require("./routes");
const { dbConnection } = require("./database/connection");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

dbConnection();
let port = process.env.PORT || 4001;

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api/v1", combineRouter);

// Serve frontend for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
