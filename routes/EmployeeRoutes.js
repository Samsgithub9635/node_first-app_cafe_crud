import express from 'express';
import Employees from '../models/employees.js'; 
const router = express.Router();
import {jwtAuthMiddleware, generateToken} from ('../jwt.js');


// POST new employee that is to signup a new user
router.post('/signup', async (req, res) => {
    try {

        // Create a new employee object(newEmp) of Employees type document using Mongoose model
        const newEmp = new Employees(req.body); //req.body: contains the data entered by the users

        // save the new employee to the database and can be accessed by response
        const response = await newEmp.save(); 
        
        const payload ={ // payload is created to store employee id, username as user data 
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload)); // logs the payload which contains user data: id, username in console just for testing
        
        // add the payload inside the generated token 
        // the generated token in jwt.js is stored inside a const variable 'token'
        const token =generateToken(payload);

        res.status(200).json({response: response, token: token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login Route
router.post('/login', async(req, res)=>{
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const employee = await Employees.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !employee || !(await employee.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password!'});  
        } 

        // genrate Token 
        const payload ={
            id: employee.id,
            username: employee.username
        }
        const token = generateToken(payload);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }

});

// Profile Route
// in profile route we are not sending any data just using get method which is protect by jwtmiddleware, we just extract the userId and username from payload in that token and send as response
router.get('/profile', jwtAuthMiddleware, async (req, res)=>{ 
    try{
        const userData =req.body;
        console.log("User Data: ", userData);
        
        const userId = userData.id;
        const user = await Employees.findById(userId);

        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
});


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
