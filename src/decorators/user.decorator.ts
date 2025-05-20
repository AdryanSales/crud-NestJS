import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return request.user;
    } else {
      throw new BadRequestException('User not found. Are you using AuthGuard?');
    }
  },
);
