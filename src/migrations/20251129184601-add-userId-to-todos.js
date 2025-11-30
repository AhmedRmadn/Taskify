'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'todos',
      'userId',
      {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('todos', 'userId');
  }
};
