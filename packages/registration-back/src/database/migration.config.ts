import { DataSource } from 'typeorm';
import { getConfig } from './ormconfig';

const datasource = new DataSource(getConfig(process.env.MYSQL_HOST_TO_MIGRATIONS as string));

datasource.initialize();
export default datasource;