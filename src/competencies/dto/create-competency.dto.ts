import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCompetencyDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  competence: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  definition: string;
}
