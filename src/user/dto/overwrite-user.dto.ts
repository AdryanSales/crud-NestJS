// import { IsString, IsEmail, IsStrongPassword } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

//como as regras de DTO da createUser vão servir pra essa tb, é só importar as regras dela aqui
export class OverwriteUserDTO extends CreateUserDTO { 
    
}