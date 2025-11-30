const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
console.log("Auth routes loaded");
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Todo API is running 222 '));

app.use(errorHandler);

module.exports = app;
