import { Injectable } from "@nestjs/common";
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
        return this.prisma.user.findUnique({
            where: {id}
        });
    }
    async overwrite(id: number, data:OverwriteUserDTO) {
        console.log(data)
        return this.prisma.user.update({
            data,
            where: {id}
        });
    }
    async update(id: number, data:UpdateUserDTO) {
        console.log(data)
        return this.prisma.user.update({
            data,
            where:{id}
        })
    }
}