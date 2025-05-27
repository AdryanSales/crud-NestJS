import { Role } from '../enums/role.enum';
import { UpdateUserDTO } from '../user/dto/update-user.dto';

export const updateUserDTO: UpdateUserDTO = {
  role: Role.Admin,
};
