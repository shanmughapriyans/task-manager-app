const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");

// All routes below are protected
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post("/", async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            userId: req.user._id,
        });

        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, description, priority, dueDate, done } = req.body;

        task.title       = title       ?? task.title;
        task.description = description ?? task.description;
        task.priority    = priority    ?? task.priority;
        task.dueDate     = dueDate     ?? task.dueDate;
        task.done        = done        ?? task.done;

        const updated = await task.save();
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
