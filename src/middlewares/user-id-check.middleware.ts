import { NestMiddleware, BadRequestException} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware { // usar o 'quick fix' para gerar a estrutura do método 'use' da interface
    use(req: Request, res: Response, next: NextFunction) {
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID inválido');
        }
        next();
    }
}