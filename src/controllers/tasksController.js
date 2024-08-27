const Task = require('../models/Task'); // Correct import

module.exports = { 
    createTask: async (req, res) => {
  try {
    const newTask = new Task(req.body);
    // If you're associating tasks with users:
    newTask.user = req.user._id; 

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

getTaskById: async (req, res)  => {
    try {
      const task = await findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  getAllTasks: async (req, res) =>  {
    try {
      const tasks = await find(); // You can add filtering/pagination here later
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
 updateTask: async(req, res) =>  {
    try {
      const task = await findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated task
        runValidators: true, // Run validation on update
      });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
 deleteTask: async(req, res)  => {
    try {
      const task = await findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).send(); // 204 No Content on successful delete
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }};