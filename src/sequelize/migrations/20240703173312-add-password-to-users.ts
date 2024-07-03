// src/sequelize/migrations/{timestamp}-add-password-to-users.ts
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values initially
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'password');
  },
};
