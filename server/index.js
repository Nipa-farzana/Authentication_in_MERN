require('dotenv').config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});