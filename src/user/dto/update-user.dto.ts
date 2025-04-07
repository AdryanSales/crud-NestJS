// import { IsString, IsEmail, IsStrongPassword } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

//  usando a DTO da classe CreateUserDTO **parcialmente**, pois não queremos que o 
export class UpdateUserDTO extends PartialType(CreateUserDTO) { 
    
}