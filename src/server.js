
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const app = require('./app');
const sequelize = require('./config/database');
const Todo = require('./models/todo.model');

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync();
    console.log('Models synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
})();
