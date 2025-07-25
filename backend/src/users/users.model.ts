import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
