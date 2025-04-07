import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable() //onde precisarmos usar o prisma na aplicação, é só importar essa classe
export class PrismaService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    // garantir que a conexão será encerrada juntamente com a aplicação
    async enableShutDownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
}