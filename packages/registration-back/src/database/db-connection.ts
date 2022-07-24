import { DataSource } from 'typeorm';
import { getConfig } from './ormconfig';

const dbConnection = new DataSource(getConfig(process.env.MYSQL_HOST as string));
export default dbConnection