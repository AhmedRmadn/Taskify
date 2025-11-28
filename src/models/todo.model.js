const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title cannot be empty' }
    }
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

priority: {
  type: DataTypes.ENUM('low', 'medium', 'high'),
  allowNull: false,
  defaultValue: 'medium',
  validate: {
    isIn: {
      args: [['low', 'medium', 'high']],
      msg: 'priority must be one of: low, medium, high'
    }
  }
}

}, {
  tableName: 'todos',
  timestamps: true
});

module.exports = Todo;
