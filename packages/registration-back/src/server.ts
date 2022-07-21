import express, { Router } from 'express';
import { registrationController } from './controllers/registration';

const app = express();

const route = Router()

app.use('/registration', registrationController);

app.use(route)


app.listen(3333, () => console.log('server running on port 3333'));