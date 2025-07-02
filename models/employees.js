import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    work: {
        type: String,
        required: true,
        enum: ["waiter", "chef", "manager"],
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be a positive number']
    },

    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 characters']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
        // Hashing should be handled before save via middleware
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
