console.log("Aqui en el Tasks.js routes again");
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
console.log("vamos a checar el auth");
const auth = require('../middleware/auth'); // JWT authentication

// Create a new task
router.post('/', auth, tasksController.createTask);
// Get all tasks (potentially with pagination/filtering later)
router.get('/', auth, tasksController.getAllTasks);

// Get a single task by ID
router.get('/:id', auth, tasksController.getTaskById);

// Update a task by ID
router.put('/:id', auth, tasksController.updateTask);

// Delete a task by ID
router.delete('/:id', auth, tasksController.deleteTask);

module.exports =  { router };
