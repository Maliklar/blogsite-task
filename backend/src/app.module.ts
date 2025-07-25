import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BlogsController } from './blogs/blogs.controller';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { BlogsService } from './blogs/blogs.service';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [UserModule, AuthModule, BlogsModule],
  controllers: [AppController, UsersController, BlogsController],
  providers: [AppService, PrismaService, BlogsService],
  exports: [PrismaService],
})
export class AppModule {}
