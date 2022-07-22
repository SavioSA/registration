import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import dbConnection from '../../database/db-connection';
import { User } from '../../database/entities/user.entity';
import { MessageInterface, PaginationInterface } from '../../helpers/interfaces/utilInterfaces';
import { UserInterface } from './interfaces/user.interface';

const router: Router = Router();
const userRepository = dbConnection.getRepository(User)

router.get< {}, UserInterface[] | MessageInterface, {}, PaginationInterface >('/', async (req, res) => {
    try {
      const { offset, page } = req.query;      
      const take: number = isNaN(offset)? 0 : offset;
      let currentPage: number = isNaN(page)? 0 : page;
      currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
      const users = await userRepository.find({
        take,
        skip: currentPage * take
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
});

router.get('/:id', (req: Request, res: Response) => {
});

router.post<{}, MessageInterface, UserInterface >('/',
  body('name').isLength({min: 3, max: 100}).withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').notEmpty(),
  body('name').isString().withMessage('name must be a string.'),
  body('birthday').isDate().withMessage('birthday must be a date.'),
  body('birthday').notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
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