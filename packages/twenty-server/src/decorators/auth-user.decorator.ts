import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { getRequest } from 'src/utils/extract-request';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);

    return request.user ? request.user.user : undefined;
  },
);
