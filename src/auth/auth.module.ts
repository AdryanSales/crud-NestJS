import { Module }           from "@nestjs/common";
import { JwtModule }        from "@nestjs/jwt";
import { UserModule }       from "src/user/user.module";
import { AuthController }   from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: `LxCHbI~c2#AY}2oC%ZY137v:'s^F,/ON` //senha gerada no site
        }),
        UserModule,
        PrismaModule // permite o acesso ao banco de dados
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}