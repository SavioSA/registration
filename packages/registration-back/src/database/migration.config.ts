import { DataSource } from 'typeorm';
import getConfig from './ormconfig';

const datasource = new DataSource(getConfig());

datasource.initialize();
export default datasource;
