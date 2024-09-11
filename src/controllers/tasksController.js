const Task = require('../models/Task'); // Correct import

module.exports = { 
    createTask: async (req, res) => {
  try {
    console.log("En el create task");
    console.log("El user");
    console.log(req.user);

    const { title, description, dueDate, status } = req.body;
    const userId = req.user.userId;
    console.log("Obteniendo el user id");
    console.log(userId);
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
      const userId = req.user.userId;
      const page = parseInt(req.query.page) || 1; // Get current page, default to 1
      const limit = parseInt(req.query.limit) || 10; // Number of items per page, default to 10

      // Calculate the skip value for pagination
      const skip = (page - 1) * limit;

      // Create a filter object for MongoDB's find()
      const filter = { user: userId };
      // Check if status query parameter is provided
      if (req.query.status) {
        // If multiple statuses are provided (comma-separated), split them into an array
        if (typeof req.query.status === 'string' && req.query.status.includes(',')) {
          filter.status = { $in: req.query.status.split(',').map(s => s.trim()) };
        } else {
          // Otherwise, filter by the single status
          filter.status = req.query.status; 
        }
      }
      const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .lean();
      
      // Get total count of tasks for the user
      const totalCount = await Task.countDocuments(filter);

      res.json({ 
        tasks, 
        currentPage: page, 
        totalPages: Math.ceil(totalCount / limit), 
        totalCount 
      });
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