const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const { protect } = require("./middleware/authMiddleware");

const { authorizeRoles } = require("./middleware/roleMiddleware");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.get(
  "/api/admin",
  protect,
  authorizeRoles("Admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
      user: req.user,
    });
  }
);

module.exports = app;
