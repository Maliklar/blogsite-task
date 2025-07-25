import { Request } from '@nestjs/common';
import { User } from '@prisma/client';

export type AuthRequest = Request & {
  user: User;
};
