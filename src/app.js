const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

console.log(" Load environment variables");
dotenv.config();

console.log(" Configurando el TasksRoutes-routerx");
const tasksRoutes = require('../src/routes/tasks').router; // Assuming you export 'router' from your routes file
console.log(" Configurando el Auth Routerv ");
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

console.log("MONGO_URI:", process.env.MONGO_URI); 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes (example)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware (add this for better error responses)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
