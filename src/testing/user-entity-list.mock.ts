import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user-entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Joao',
    email: 'joao@mail.com',
    birthAt: new Date('1999-07-28'),
    id: 1,
    password: '123456',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Daniel',
    email: 'daniel@mail.com',
    birthAt: new Date('1999-07-28'),
    id: 2,
    password: '123456',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Kaio',
    email: 'kaio@mail.com',
    birthAt: new Date('1999-07-28'),
    id: 3,
    password: '123456',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
