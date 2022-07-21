import express, { Router } from 'express';
import { DataSource } from 'typeorm';
import { UsersController } from './controllers/users';
import { getConfig } from './database/ormconfig';
const dbConnection = new DataSource(getConfig());

dbConnection
  .initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })



const app = express();

const route = Router()



app.use(express.json())

app.use('/users', UsersController);

app.use(route)


app.listen(3333, () => console.log('server running on port 3333'));