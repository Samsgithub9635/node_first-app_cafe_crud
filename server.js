import express from 'express';
import db from './db.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import MenuItemRoutes from './routes/MenuItemRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Sir/Ma'am Welcome to our Hotel...How can I help you?😊");
});

app.use('/employee', EmployeeRoutes);
app.use('/menu', MenuItemRoutes);

app.listen(3000, () => console.log('Server listening at port 3000'));
