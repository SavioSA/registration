import { DataSource } from 'typeorm';
import { getConfig } from './ormconfig';

const dbConnection = new DataSource(getConfig());
export default dbConnection