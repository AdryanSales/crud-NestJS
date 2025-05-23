import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(`URL: ${request.url}`); //visualizar rota utilizada para requisição
        console.log(`METHOD: ${request.method}`); //visualizar método utilizado para requisição
        console.log(`Execução levou: ${Date.now() - dt} milisegundos.`);
      }),
    );
  }
}
