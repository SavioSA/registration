import express, { Router } from 'express';
import { UsersController } from './controllers/users';

const app = express();

const route = Router()

app.use('/users', UsersController);

app.use(route)


app.listen(3333, () => console.log('server running on port 3333'));