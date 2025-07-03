import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

employeeSchema.pre('save', async function(next) { //.pre is a middleware function 
    const employee = this; // everytime we try to save new record it will be at first stored inside employee variable

    // Hash the password only if it has been modified (or is new)
   if(!employee.isModified('password')) return next(); //if not password modified got to next() therefore no hasing required
   
    try{
        // hash password generation

        // generating salt
        const salt = await bcrypt.genSalt(10); // generating salt using bcryprt library for password hashing, 10 is rounds, rounds represent how complex password will be more the rounds value increases more computational cost increases // 10 is ideal generally
        
        // hash password generation
        const hashPassword = await bcrypt.hash(employee.password, salt);

        // Override the previous password with the new hashed password
        employee.password = hashPassword; 

        next(); //next callback function says to the employeeSchema(mongoose) every operation tobe done before saving is done now you can save to database   
    }catch(err){
        return next(err);
    }
}) 


employeeSchema.method.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
