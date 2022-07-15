'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn('Books', 'userID', {
      type: Sequelize.INTEGER,
      references: {model: 'Users', field: 'id'}
    })
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.removeColumn('Books', 'userID', {
      type: Sequelize.INTEGER,
      references: {model: 'Users', field: 'id'}
    })
  }
};
