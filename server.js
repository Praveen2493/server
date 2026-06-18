const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRouters = require("./routes/taskRoutes");
const testRoutes = require("./routes/testRoutes");
const commentRoutes = require("./routes/commentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");


// Connect Database
connectDB();

const app = express();   

app.use(cors({
    origin: "https://guvi-task-managment-frontend.netlify.app",
    credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRouters);
app.use("/api/test", testRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(
    path.join(__dirname, "uploads")
  )
);


app.get("/", (req, res) => {
    res.send("Task Management API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});