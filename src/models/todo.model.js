const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {

  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
      defaultValue: 'medium'
    }

  }, {
    tableName: 'todos',
    timestamps: true
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Todo;
};
