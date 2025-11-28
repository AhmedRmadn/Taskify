module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: Sequelize.TEXT,
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dueDate: Sequelize.DATE,
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  }
};
