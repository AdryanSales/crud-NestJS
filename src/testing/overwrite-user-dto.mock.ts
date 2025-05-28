import { Role } from '../enums/role.enum';
import { OverwriteUserDTO } from '../user/dto/overwrite-user.dto';

export const overwriteUserDTO: OverwriteUserDTO = {
  birthAt: '1999-07-28',
  email: 'pablo123@mail.com',
  name: 'Joao Roberto',
  password: '123456',
  role: Role.User,
};
