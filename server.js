// server.js

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { catchErrors, notFound, developmentErrors, productionErrors } = require('./errorHandlers');
const User = require('./models/User'); 
const Student = require('./models/Student'); 
const bcrypt = require('bcrypt');
// Initialize Express app
const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
// Connect to MongoDB
mongoose.connect('mongodb+srv://arab:arab@cluster0.kqnzelj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Mock User Data with hashed passwords
   
    // Mock Student Data
    const students = [
      { name: 'John developmdendctErrorsss', age: 15, className: '10A', year: 2024,category: 'primary' },
      { name: 'Jane Smitssfssdsh', age: 16, className: '11B', year: 2023 ,category: 'primary'},
      { name: 'John developmdendctErrorsss', age: 15, className: '10A', year: 2024,category: 'primary' },
      
      // Add more mock stdudents as needed
    ];

    // Save mock students to the database
    await Student.insertMany(students);
    
  } catch (error) {
    console.error('Error saving mock data:', error);
  }

});
// Routes


// Error handling middleware


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
