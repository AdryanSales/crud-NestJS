import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  // ! posso definir a regra que eu desejar para a senha,
  // mas por padrão ele pede 1 de cada pré-requisito
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: number;
}
