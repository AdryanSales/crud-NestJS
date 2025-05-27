import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { UserEntity } from './entity/user-entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { overwriteUserDTO } from '../testing/overwrite-user-dto.mock';
import { updateUserDTO } from '../testing/update-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('method read', async () => {
      const result = await userService.read();
      expect(result).toEqual(userEntityList);
    });
    test('method readOne', async () => {
      const result = await userService.readOne(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('method overwrite', async () => {
      const result = await userService.overwrite(1, overwriteUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
    test('method update', async () => {
      const result = await userService.update(1, updateUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(true);
    });
  });
});
