const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getMyTasks,
  deleteTask
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Admin creates task
router.post("/", protect, authorizeRoles("Admin"), createTask);

// Get all tasks
router.get("/", protect, getTasks);

// Member gets own tasks
router.get("/my", protect, authorizeRoles("Member"), getMyTasks);

// Update task status (Member)
router.patch("/:id", protect, authorizeRoles("Member"), updateTaskStatus);

router.delete("/:id", protect, authorizeRoles("Admin"), deleteTask);

module.exports = router;