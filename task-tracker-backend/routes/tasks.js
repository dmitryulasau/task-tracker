const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.username === req.body.username) {
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedTask);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Tasks!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.username === req.body.username) {
      await task.deleteOne();
      res.status(200).json("The task has been deleted");
    } else {
      res.status(403).json("You can delete only your task");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
