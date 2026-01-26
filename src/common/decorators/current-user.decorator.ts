import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/entities';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): unknown => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;

    if (data) {
      return user?.[data as keyof User];
    }

    return user;
  },
);
