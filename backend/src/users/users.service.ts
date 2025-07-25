import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './users.model';
import { User as PrismaUser } from '@prisma/client';

import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async get(id: number) {
    id = +id;
    if (isNaN(id)) throw new BadRequestException('Invalid user ID');
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { blogs: { take: 3 } },
    });
  }

  async getByEmail(email: string, password = false) {
    return this.prisma.user.findUnique({
      where: { email },
      omit: { password },
    });
  }

  async getAll({ page, pageSize }: PaginationDTO) {
    const data = await this.prisma.user.findMany({
      omit: { password: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalRecords = await this.prisma.user.count();
    const totalPages = Math.ceil(totalRecords / pageSize);
    return { data, page, pageSize, totalPages, totalRecords };
  }

  async create(data: User) {
    return this.prisma.user.create({ data });
  }

  async update(data: User, user: PrismaUser) {
    return this.prisma.user.update({ where: { id: user.id }, data });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
