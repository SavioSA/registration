export interface UsersPaginationInterface {
  pagesQuantity: number;
  users: UserInterface[];
}

export interface UserInterface {
  id?: number;
  name: string
  birthday: string
}