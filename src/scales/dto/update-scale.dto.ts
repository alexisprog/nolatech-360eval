import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateScaleDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  description: string;
}
