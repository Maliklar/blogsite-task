/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  pageSize: number = 10;
}
