import { IsEmail, IsString, IsStrongPassword } from 'class-validator'

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
        minNumbers: 0
    })
    password: string;
}