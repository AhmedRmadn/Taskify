const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

app.get('/', (req, res) => res.send('Todo API is running'));

app.use(errorHandler);

module.exports = app;
