import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '07021998',
  database: 'NGCash',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3001,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;