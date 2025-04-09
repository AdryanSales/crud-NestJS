import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: `LxCHbI~c2#AY}2oC%ZY137v:'s^F,/ON` //senha gerada no site
    })]
})
export class AuthModule {

}