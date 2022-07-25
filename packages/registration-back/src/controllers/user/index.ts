// eslint-disable-next-line import/no-unresolved
import { UserInterface, UsersPaginationInterface } from '@shared/interfaces';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import dbConnection from '../../database/db-connection';
import User from '../../database/entities/user.entity';
import { MessageInterface, PaginationInterface } from '../../helpers/interfaces/utilInterfaces';

const router: Router = Router();
const userRepository = dbConnection.getRepository(User);

function setErrorValidationMessage(errors: { msg: string } []) {
  let errorMessage = '';
  errors.forEach((error, index) => {
    if (index === errors.length - 1) {
      errorMessage += ` ${error.msg}`;
    } else {
      errorMessage += ` ${error.msg.replace('.', ',')}`;
    }
  });
  return `There was an error with your request:${errorMessage}`;
}

router.get< {}, UsersPaginationInterface | MessageInterface, {}, PaginationInterface >('/', async (req, res) => {
  try {
    const { offset, page } = req.query;
    const take: number = Number.isNaN(offset) ? 0 : offset;
    let currentPage: number = Number.isNaN(page) ? 0 : page;
    currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
    const itensPerPage = currentPage * take;
    const usersSearch = await userRepository.findAndCount({
      take,
      skip: itensPerPage,
    });

    const users: User[] = usersSearch[0];
    const usersTotalCount: number = usersSearch[1];
    const pagesQuantity: number = Math.ceil(usersTotalCount / (offset || usersTotalCount));

    res.status(200).json({ users, pagesQuantity });
  } catch (error) {
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.get< { id: number }, UserInterface | MessageInterface, {}, {} >('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({
      where: { id },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: 'There was an error with your request: User not found.' });
    }
  } catch (error) {
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

router.post<{}, MessageInterface | UserInterface, UserInterface >(
  '/',
  body('name').isLength({ min: 3, max: 100 }).withMessage('name must have beetwen 3 and 100 characters.'),
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
        const registeredUser = await userRepository.save(user);
        res.status(200).json(registeredUser);
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }
    } catch (error) {
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
  },
);

router.put<{}, MessageInterface, UserInterface>(
  '/',
  body('name').isLength({ min: 3, max: 100 }).optional().withMessage('name must have beetwen 3 and 100 characters.'),
  body('name').notEmpty().optional(),
  body('name').isString().optional().withMessage('name must be a string.'),
  body('birthday').isDate().optional().withMessage('birthday must be a date.'),
  body('birthday').notEmpty().optional(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { id } = req.body;
        const userExists = await userRepository.findOne({
          where: { id },
        });
        if (!userExists) {
          res.status(404).json({ msg: 'There was an error with your request: User not found.' });
        } else {
          userRepository.update({ id }, { ...req.body });
          res.status(200).json({ msg: 'User updated successfully.' });
        }
      } else {
        const errorMessage = setErrorValidationMessage(errors.array());
        res.status(403).json({ msg: errorMessage });
      }
    } catch (error) {
      res.status(500).json({ msg: `There was an error with your request: ${error}` });
    }
  },
);

router.delete<{ id: number }, UserInterface | MessageInterface, {}, {}>('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await userRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      res.status(404).json({ msg: 'There was an error with your request: User not found.' });
    } else {
      await userRepository.delete({ id });
      res.status(200).json({ msg: 'User deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ msg: `There was an error with your request: ${error}` });
  }
});

const UsersController: Router = router;
export default UsersController;
