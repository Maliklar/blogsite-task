import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthRequest } from 'src/@types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateBlogDTO, UpdateBlogDTO } from './blogs.model';
import { BlogsService } from './blogs.service';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { ResponseDTO } from 'src/dto/Response.dto';

@Controller('api/blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}
  @Get()
  @ApiResponse({ type: ResponseDTO })
  getAll(@Query() pagination: PaginationDTO) {
    return this.blogsService.getAll(pagination);
  }
  @Get(':id')
  get(@Param('id') id: number) {
    return this.blogsService.get(+id);
  }

  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ type: CreateBlogDTO })
  create(@Body() data: CreateBlogDTO, @Request() request: AuthRequest) {
    console.log('datadatadata', request.body);
    return this.blogsService.create(data, request.user);
  }

  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @Put()
  update(@Body() data: UpdateBlogDTO, @Request() request: AuthRequest) {
    console.log('datadatadata', request.body);
    return this.blogsService.update(data, request.user);
  }

  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Request() request: AuthRequest) {
    return this.blogsService.delete(+id, request.user);
  }

  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @Get('user/get')
  getMyBlogs(@Request() request: AuthRequest) {
    return this.blogsService.getMyBlogs(request.user);
  }
}
