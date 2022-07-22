import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
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

router.post<{}, MessageInterface, UserInterface>('/',
  body('name').isLength({min: 3, max: 100}).withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').notEmpty(),
  body('name').isString().withMessage('name must be a string.'),
  body('birthday').isDate().withMessage('birthday must be a date.'),
  body('birthday').notEmpty(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        const { name, birthday } = req.body;
        const user = new User();
        user.birthday = birthday;
        user.name = name;
        await userRepository.save(user);
        res.status(200).json({ msg: 'User registered successfully.' });
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }
  } catch (error) {
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    };
});

router.put('/', (req: Request, res: Response) => {
});

router.delete('/', (req: Request, res: Response) => {
});

function setErrorValidationMessage(errors: { msg: string } []) {
  let errorMessage = ''
  errors.forEach((error, index) => {          
    if (index === errors.length-1) {
      errorMessage += ` ${error.msg}`;
    } else {
      errorMessage += ` ${error.msg.replace(".", ",")}`;
    }
  })
  return `There was an error with your request:${errorMessage}`;
}

export const UsersController: Router = router