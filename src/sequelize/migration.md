# NestJS, Sequelize and Postgres Migration Thing

<b>Warning</b>: Use Sequelize version 6.2.0 to work with typescript.

Note: After setting up your Nestjs Project with Postgres and Sequelize.

### Get Started With Migration Thing

#### 1. Install Sequelieze-cli package.

```properties
    yarn add sequelize-cli@6.2.0 --dev
    // or
    npm install sequelize-cli@6.2.0 --save-dev
```

#### 2. Create Sequelize migration directory using this

Create .sequelizerc file with following content. You can even modify directory structure.

```javascript
module.exports = {
  config: path.resolve('src/sequelize', 'config.ts'),
  'migrations-path': path.resolve('src/sequelize', 'migrations'),
  'seeders-path': path.resolve('src/sequelize', 'seeders'),
  'models-path': path.resolve('src/sequelize', 'models'),
};
```

#### 3. After setting up your directory structure for sequelize migration. Run this command to generate these directories and files.

```properties
    yarn sequelize init
```

#### 4. After all this you can Now generate migration file to write your migrations using this command. [Take Help of internet if it's not work for you.]

```properties
    yarn sequelize-cli migration:generate --name create-user-table
```

This will generate a migration file inside your migrations directory with something like following pattern {20240703161738-create-user-table.js/.ts}

#### 5. Write your migration in this file.

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  },
};
```

#### 6. After these Migrate these changes into your DB. To migrate simply run this command

```properties
    yarn sequelize-cli db:migrate
```

This will create a table for migration and a table for users inside your Postgres Database.

#### 7. Update your table fields. For example to add a new table inside your users table Create a new migration called add-passwords-field

```properties
    yarn sequelize-cli migration:generate --name add-passwords-field
```

#### 8. This will generate another migration file inside your migration directory. where you can perform adding a new field inside users table. Update your add-passwords-field migration file with following code to add new field password.

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'password');
  },
};
```

#### 9. In last to sync your db with new field run again migration command.

```properties
     yarn sequelize-cli db:migrate
```

#### 10. Check your migration status.

```properties
     yarn sequelize-cli db:migrate:status
```

#### 11. Rollback the Last Migration

To rollback the last migration that was applied, use the following command:

```properties
   yarn sequelize-cli db:migrate:undo
```

#### 12. Rollback to a specific migration

If you want to rollback to a specific migration, you can specify the name of the migration file:

```properties
   yarn sequelize-cli db:migrate:undo --to {migration-file-name}
```

[Learn More](https://chatgpt.com/c/8b64aeff-ea7a-4c26-86aa-43bb7d1bd1fe)
