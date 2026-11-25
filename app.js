// Backend setup added for Assignment 3. Original supplied code is retained below.
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  salary: { type: Number, required: true }
}, { collection: 'employees', versionKey: false });

const Employee = mongoose.model('Employee', employeeSchema);
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Task1: initiate app and run server at 3000

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Also serve the correctly-cased supplied folder name: dist/Frontend.
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));
// Task2: create mongoDB connection 


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get(['/api/employeelist', '/employeelist'], asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ _id: -1 });
  res.status(200).json(employees);
}));





//TODO: get single data from db  using api '/api/employeelist/:id'

app.get(['/api/employeelist/:id', '/employeelist/:id'], asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid employee ID' });
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json(employee);
}));






//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post(['/api/employeelist', '/employeelist'], asyncHandler(async (req, res) => {
  const { name, location, position, salary } = req.body;
  if (!name || !location || !position || salary === undefined || salary === '') {
    return res.status(400).json({ message: 'name, location, position and salary are required' });
  }
  const employee = await Employee.create({ name, location, position, salary: Number(salary) });
  res.status(201).json(employee);
}));







//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete(['/api/employeelist/:id', '/employeelist/:id'], asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid employee ID' });
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json({ message: 'Employee deleted successfully', employee });
}));






//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put(['/api/employeelist', '/employeelist'], asyncHandler(async (req, res) => {
  const { _id, name, location, position, salary } = req.body;
  if (!_id || !mongoose.isValidObjectId(_id)) return res.status(400).json({ message: 'A valid employee _id is required' });
  const updatedEmployee = await Employee.findByIdAndUpdate(
    _id,
    { name, location, position, salary: Number(salary) },
    { new: true, runValidators: true }
  );
  if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json(updatedEmployee);
}));



app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: 'Internal server error' });
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




app.listen(PORT, () => console.log(`Employee App server running on port ${PORT}`));
