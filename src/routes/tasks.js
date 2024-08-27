console.log("Aqui en el Tasks.js routes again");
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
console.log("vamos a checar el auth");
const auth = require('../middleware/auth'); // JWT authentication

// Protect all task routes with authentication
router.use(auth); 
// Create a new task
router.post('/', tasksController.createTask);
// Get all tasks (potentially with pagination/filtering later)
router.get('/', tasksController.getAllTasks);

// Get a single task by ID
router.get('/:id', tasksController.getTaskById);

// Update a task by ID
router.put('/:id', tasksController.updateTask);

// Delete a task by ID
router.delete('/:id', tasksController.deleteTask);

module.exports =  { router };
