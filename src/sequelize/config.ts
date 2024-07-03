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
    url: 'postgres://postgres:test@localhost:5432/pg_migrations_dev',
  },
  test: {
    dialect: 'postgres',
    url: 'postgres://postgres:test@localhost:5432/pg_migrations_test',
  },
  production: {
    dialect: 'postgres',
    url: 'postgres://postgres:test@localhost:5432/pg_migrations_prod',
  },
};

export = config;
