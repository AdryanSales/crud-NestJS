import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '1999-07-28',
  email: 'pablo123@mail.com',
  name: 'Joao Roberto',
  password: '123456',
  role: Role.User,
};
