import express from 'express';
import Employees from '../models/employees.js'; 
const router = express.Router();
// const {jwtAuthMiddleware, generateToken}=  require('../jwt.js');





// GET all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employees.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET employee by ID
router.get('/id/:id', async (req, res) => {
    try {
        const employee = await Employees.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET employees by work
router.get('/work/:work', async (req, res) => {
    try {
        const employees = await Employees.find({ work: req.params.work.toLowerCase() });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// PUT update employee by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedEmp = await Employees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEmp) return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE employee by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmp = await Employees.findByIdAndDelete(req.params.id);
        if (!deletedEmp) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
