// controllers/studentController.js
//private yes
//
const Student = require('../models/Student');

const multer = require('multer');

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

exports.uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    // File upload successful, return file path
    res.status(200).json({ filePath: req.file.path });
  });
};
exports.getAllStudents = async (req, res, next) => {
  try {
    const { page, pageSize, category, year, className } = req.query;

    // Convert page and pageSize to numbers
    const pageNumber = parseInt(page, 10) || 0; // Adjust to start from 0
    const limit = parseInt(pageSize, 10) || 10;

    // Ensure page number and page size are positive
    if (pageNumber < 0 || limit <= 0) {
      return res.status(400).json({ message: 'Invalid page number or page size' });
    }

    // Construct the filter object based on the provided criteria
    const filter = {};

    // Apply filter based on category (primary/secondary)
    if (category) {
      filter.category = category;
    }

    // Apply filter based on year
    if (year && year !== '0') {
      filter.year = year;
    }

    // Apply filter based on class name if it's not empty
    if (className && className.trim() !== '') {
      filter.className = className;
    }

    // Count total documents based on the filter
    const count = await Student.countDocuments(filter);
    const totalPages = Math.ceil(count / limit);

    // Calculate the number of documents to skip
    const skip = pageNumber * limit; // Adjust for starting from 0

    // Fetch students based on the constructed filter and pagination
    const students = await Student.find(filter).skip(skip).limit(limit);

    // Return paginated results along with total count and total pages
    res.status(200).json({ students, count, totalPages });
  } catch (error) {
    next(error);
  }
};



exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, className, year } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, { name, age, className, year }, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};
