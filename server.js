import express from 'express';
import db from './db.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import MenuItemRoutes from './routes/MenuItemRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import passport from './auth.js'; // ✅ Add `.js` extension

const app = express();
app.use(express.json());

// fetch port number from dotenv if run anywhere online other than my local pc else use 3000 my localhost port number
const PORT = process.env.PORT || 3000;

//Middleware Function defining
const logRequest = (req,res, next)  =>{
  console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
  next(); // Move on to the next phase
} 

// app.use used to use the middleware function to all route path or endpoint path (eg /employee, /menu, menu/taste, ... etc) to all the endpoints
app.use(logRequest);

// Using authentication without session
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false}) // ✅ Middleware works now

app.get('/', (req, res) => {
  res.send("Welcome to Coder's Cafe ☕ — My REST API is live! \n How can I help you?");
});

// app.use is used to set the same route path for all urls
app.use('/employee', EmployeeRoutes);
app.use('/menu', MenuItemRoutes);

// listener to listen port 3000 and console.log message
app.listen(PORT, () => console.log('Server listening at port 3000'));
