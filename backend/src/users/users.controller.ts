import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRequest } from 'src/@types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './users.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDTO } from 'src/dto/Response.dto';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.get(id);
  }

  @Get()
  @ApiResponse({ type: ResponseDTO<User[]> })
  getAll(@Query() pagination: PaginationDTO) {
    return this.userService.getAll(pagination);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() data: User, @Request() request: AuthRequest) {
    return this.userService.update(data, request.user);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Request() request: AuthRequest) {
    return this.userService.delete(request.user.id);
  }
}
