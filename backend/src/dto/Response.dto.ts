import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty({ type: [Object] })
  data: T;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  totalRecords: number;
}
