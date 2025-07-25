import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDTO, UpdateBlogDTO } from './blogs.model';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  async getAll({ page, pageSize }: PaginationDTO) {
    const data = await this.prisma.blog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: { omit: { createdAt: true, updatedAt: true, password: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalRecords = await this.prisma.blog.count();
    const totalPages = Math.ceil(totalRecords / pageSize);
    return { data, page, pageSize, totalPages, totalRecords };
  }
  async get(id: number) {
    id = +id;
    if (isNaN(id)) {
      throw new BadRequestException('Invalid blog ID');
    }
    return this.prisma.blog.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async create(data: CreateBlogDTO, user: User) {
    return this.prisma.blog.create({
      data: { ...data, user: { connect: { id: user.id } } },
    });
  }

  async update(data: UpdateBlogDTO, user: User) {
    return this.prisma.blog.update({
      where: { id: data.id, userId: user.id },
      data,
    });
  }
  async delete(id: number, user: User) {
    return this.prisma.blog.delete({ where: { id, userId: user.id } });
  }

  async getMyBlogs(user: User) {
    return this.prisma.blog.findMany({ where: { userId: user.id } });
  }
}
