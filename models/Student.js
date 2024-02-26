// models/Student.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  className: { type: String, required: false },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String } // You can store the image URL here
});

module.exports = mongoose.model('Student', studentSchema);
