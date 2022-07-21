import { Request, Response, Router } from 'express';
import dbConnection from '../../database/db-connection';
import { User } from '../../database/entities/user.entity';
import { MessageInterface } from '../../helpers/interfaces/message.interface';
import { UserInterface } from './interfaces/user.interface';

const router: Router = Router();
const userRepository = dbConnection.getRepository(User)

router.get('/', (req: Request, res: Response) => {
});

router.get('/:id', (req: Request, res: Response) => {
});

router.post<{}, MessageInterface, UserInterface>('/', async (req: Request, res: Response) => {
  try {
  } catch (error) {
  }
  
});

router.put('/', (req: Request, res: Response) => {
});

router.delete('/', (req: Request, res: Response) => {
});

export const UsersController: Router = router