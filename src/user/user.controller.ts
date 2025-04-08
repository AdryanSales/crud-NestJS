import { 
    Controller,
    Post, Get, Put, Patch, Delete,   // CRUD
    Body
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { OverwriteUserDTO } from "./dto/overwrite-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserSevice } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserSevice){}

    @Post()
    async create(@Body() data:CreateUserDTO) {
        return this.userService.create(data);
    }
    @Get()
    async read() {
        return this.userService.read();
    }
    @Get(":id")
    async readOne(@ParamId() id: number) {
        return this.userService.readOne(id);
    }
    @Put(":id") 
    async overwrite(@Body() data:OverwriteUserDTO, @ParamId() id: number) {
        return this.userService.overwrite(id, data);
    }
    @Patch(":id")
    async update(@Body() data:UpdateUserDTO, @ParamId() id) {
        return this.userService.update(id, data);
    }
    @Delete(":id")
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}