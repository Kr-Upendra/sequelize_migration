// src/sequelize/migrations/{timestamp}-make-password-not-null.ts
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: false, // Disallow null values now
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },
};
