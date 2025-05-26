import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { OverwriteUserDTO } from './dto/overwrite-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.usersRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt); // parametros(1, 2) 1: buffer, 2:tamanho do hash

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async read() {
    return this.usersRepository.find();
  }

  async readOne(id: number) {
    return await this.exists(id);
  }

  async overwrite(
    id: number,
    { name, email, password, birthAt, role }: OverwriteUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt
        ? new Date(birthAt).toISOString().split('T')[0]
        : undefined,
      role,
    });

    return this.readOne(id);
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdateUserDTO,
  ) {
    await this.exists(id);

    const data: UpdateUserDTO = {};

    // condicionais para definir que se os parâmetros existirem no request,
    // eles devem ser enviados para seus campos correspondentes no banco de dados
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (birthAt) {
      data.birthAt = birthAt;
    }
    if (role) {
      data.role = role;
    }
    await this.usersRepository.update(id, data);
    return this.readOne(id);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.usersRepository.delete(id);
  }

  async exists(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
    return user;
  }
}
