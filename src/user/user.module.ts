import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserSevice } from "./user.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserSevice],
    exports: []
})
export class UserModule {}