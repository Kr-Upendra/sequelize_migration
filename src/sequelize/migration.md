# NestJS, Sequelize and Postgres Migration Thing

[Medium Blog Post]()

This repository demonstrates how to set up migrations for a NestJS application using Sequelize ORM with a Postgres database. We'll leverage TypeScript throughout the process for enhanced type safety.

2. Create a nestjs project

```bash
nest new <project_name>
```

3. After completing creating a nestjs project install require packages.

```bash
yarn add sequelize sequelize-typescript pg pg-hstore @nestjs/config

yarn add @types/sequelize --dev
```

4. Now create a .env file and add database configuration and other things like port number. You can multiple database based on enviroment veriable. for example

```bash
PORT=8080
NODE_ENV='development'
DATABASE_URL='postgres://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/TEST_DB_NAME'
DATABASE_URL='postgres://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/DEVELOPMENT_DB_NAME'
DATABASE_URL='postgres://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/PRODUCTION_DB_NAME'
```

5. Now let's make changes in main.ts file to serve backend on specified port.

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
```

6. Let's make changes in app.module.ts and connect our app with database.

```javascript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      uri: process.env.DATABASE_URL,
      models: [],
    }),
  ],
})
export class AppModule {}
```

7. After setting up our nestjs application let's get started with setting migration thing.

install require package to get started with sequelize migration.

<b>Warning</b>: Use sequelize-cli version 6.2.0 to work with typescript.

#### 1. Install Sequelieze-cli package.

```properties
yarn add sequelize-cli@6.2.0 --dev
```

#### 2. Create Sequelize migration directory using this

Create .sequelizerc file with following content. You can even modify directory structure for your migration directory.

```javascript
const path = require('path');

require('ts-node/register'); // add this to work with typescript

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

Now make changes in config.ts file with following code.

```typescript
import { Dialect } from 'sequelize';

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    url: string;
  };
}

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  test: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
};

export = config;
```

NOTE: If this show error then install dotenv package and use in this file as we usually use dotenv package.

- Make changes in models/index.js file with following code.

```javascript
// packages that are imported

const sequelize = new Sequelize(`${config.url}`, config);

// fs file configuration
```

#### 4. After all this you can Now generate migration file to write your migrations using this command.

```properties
yarn sequelize-cli migration:generate --name create-user-table
```

This will generate a migration file inside your migrations directory with something like following pattern {20240703161738-create-user-table.js/.ts}, convert this into typescript.

#### 5. Write your migration in this file.

```typescript
// src/sequelize/migrations/{timestamp}-create-users-table.ts
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  },
};
```

#### 6. After these Migrate these changes into your DB. To migrate simply run this command

```properties
<<<<<<< HEAD
yarn sequelize-cli db:migrate
=======
  yarn sequelize-cli db:migrate
>>>>>>> dbbdbdc623c8b9a14bdb0ade01994434535b5dc3
```

This will create a table for migration and a table for users inside your Postgres Database. In the migration table it will simply store migration history.

#### 7. Update your table fields. For example to add a new field inside your users table Create a new migration with following name add-about-field

```properties
yarn sequelize-cli migration:generate --name add-about-field
```

#### 8. This will generate another migration file inside your migration directory. where you can perform adding a new field inside users table. Update your add-about-field migration file with following code to add new field about.

```typescript
// src/sequelize/migrations/{timestamp}-add-about-field.ts
import { QueryInterface, DataTypes } from 'sequelize';

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

let's generate seed to create some fake users in table using seeders.

run this command to generate your first seed file

```properties
yarn sequelize-cli seed:generate --name demo-users
```

Change filetype to typescript and change the code with following

```ts
// src/sequelize/seeders/{timestamp}-demo_users.ts
import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        fullname: 'John Doe',
        email: 'johndoe@user.io',
        about: 'Lorem Ipsum sit amet dollor, Lorem Ipsum sit amet dollor.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // add more users
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
```
