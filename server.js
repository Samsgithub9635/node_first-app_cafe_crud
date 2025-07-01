import express from 'express';
import db from './db.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import MenuItemRoutes from './routes/MenuItemRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


// fetch port number from dotenv if run anywhere online other than my local pc else use 3000 my localhost port number
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Coder's Cafe ☕ — My REST API is live! \n How can I help you?");
});


app.use('/employee', EmployeeRoutes);
app.use('/menu', MenuItemRoutes);

// listener to listen port 3000 and console.log message
app.listen(PORT, () => console.log('Server listening at port 3000'));
