import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OverwriteUserDTO } from './dto/overwrite-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
// import { LogInterceptor } from "src/interceptors/log.interceptor"; // só importe se for utilizar nesse arquivo

// Podemos usar Interceptors nos controles
// @UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Podemos usar Interceptors nos métodos
  // @UseInterceptors(LogInterceptor)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin)
  @Get() // mostra todos os usuarios cadastrados
  async read() {
    return this.userService.read();
  }

  @Roles(Role.Admin)
  @Get(':id') // mostra apenas um usuário com base no id
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async overwrite(
    @Body() data: OverwriteUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    //  exige que todas as informações sejam passadas, do contrário,
    //  se deixar em branco irá sobrescrever as informações já existentes, deixando vazio,
    //  mas podemos montar uma validação pra cada campo, evitando isso
    return this.userService.overwrite(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id) {
    return this.userService.update(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  //  importante de se utilizar pipes (tubos), para transformar string em number
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
