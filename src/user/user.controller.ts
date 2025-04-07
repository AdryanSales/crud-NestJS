import { 
    Controller,
    Post, Get, Put, Patch, Delete,   // CRUD
    Param, Body,
    ParseIntPipe
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { OverwriteUserDTO } from "./dto/overwrite-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserSevice } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserSevice){}

    @Post()
    async create(@Body() data:CreateUserDTO) {
        return this.userService.create(data);
    }
    @Get() // mostra todos os usuarios cadastrados
    async read() {
        return this.userService.read();
    }
    @Get(":id") // mostra apenas um usuário com base no id
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.readOne(id);
    }
    @Put(":id") 
    async overwrite(@Body() data:OverwriteUserDTO, @Param('id', ParseIntPipe) id: number) {
        //  exige que todas as informações sejam passadas, do contrário, 
        //  se deixar em branco irá sobrescrever as informações já existentes, deixando vazio, 
        //  mas podemos montar uma validação pra cada campo, evitando isso
        return this.userService.overwrite(id, data);
    }
    @Patch(":id")
    async update(@Body() data:UpdateUserDTO, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, data);
    }
    @Delete(":id")
    //  importante de se utilizar pipes (tubos), para transformar string em number
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}