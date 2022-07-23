import { UserInterface } from './user.interface';

export interface UsersPaginationInterface {
  pagesQuantity: number;
  users: UserInterface[];
}