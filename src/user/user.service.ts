import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { OverwriteUserDTO } from "./dto/overwrite-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserSevice {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDTO){
        return this.prisma.user.create({data});
    }
    async read() {
        return this.prisma.user.findMany();
    }
    async readOne(id: number) {
        await this.exists(id);

        return this.prisma.user.findUnique({
            where: {id}
        });
    }
    async overwrite(id: number, {name, email, password, birthAt}:OverwriteUserDTO) {
        await this.exists(id);

        return this.prisma.user.update({
            data:{ 
                name, 
                email, 
                password, 
                birthAt: birthAt ? new Date(birthAt) : null // se existir uma string definida, converte para Date, se não: define um valor nulo
            },
            where: {id}
        });
    }
    async update(id: number, {name, email, password, birthAt}:UpdateUserDTO) {
        await this.exists(id);
        
        const data: any = {}
        
        // condicionais para definir que se os parâmetros existirem no request, 
        // eles devem ser enviados para seus campos correspondentes no banco de dados
        if (name)       { data.name = name; }
        if (email)      { data.email = email;}
        if (password)   { data.password = password;}
        if (birthAt)    { data.birthAt = new Date(birthAt);}
        return this.prisma.user.update({
            data,
            where:{id}
        })
    }
    async delete(id: number) {
        await this.exists(id);

        return this.prisma.user.delete({ where: {id} })
    }
    async exists(id: number) {
        if (!(await this.prisma.user.count({ // conte quantos registros há com esse id (1:true, 0:false)
            where:{id}
        }))) { // se não retornar nada crie uma exceção
            throw new NotFoundException(`O usuário ${id} não existe.`)
        }
    }
}