const Task = require('../models/Task'); // Correct import

module.exports = { 
    createTask: async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user._id;

    const newTask = new Task( {
      title,
      description,
      dueDate,
      status,
      user: userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

getTaskById: async (req, res)  => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  getAllTasks: async (req, res) =>  {
    try {
      const userId = req.user._id;
      const tasks = await Task.find({ user: userId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
 updateTask: async(req, res) =>  {
    try {
      const taskId = req.params.id;
      const updates = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
 deleteTask: async(req, res)  => {
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully' });// 204 No Content on successful delete
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }};