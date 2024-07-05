// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };

import { DataTypes, QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('users', 'about', {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'about');
  },
};
