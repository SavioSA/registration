import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: '../../.env' });

export default function getConfig() {
  return {
    migrationsTableName: 'migrations',
    type: 'mysql',
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/**/**/**.entity{.ts,.js}'],
    migrations: ['src/database/migrations/**/*{.ts,.js}'],
    subscribers: ['src/database/subscriber/**/*{.ts,.js}'],
  } as DataSourceOptions;
}
