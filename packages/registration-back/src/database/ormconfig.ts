import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
      migrationsTableName: 'migrations',
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '1234567',
      database: 'registration',
      logging: false,
      synchronize: false,
      name: 'default',
      entities: ['src/**/**.entity{.ts,.js}'],
      migrations: ['src/database/migrations/**/*{.ts,.js}'],
      subscribers: ['src/database/subscriber/**/*{.ts,.js}'],
   });