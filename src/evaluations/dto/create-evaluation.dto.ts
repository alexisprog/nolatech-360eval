import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Hierarchy } from 'src/common/enums/hierarchy.enum';

export class CreateEvaluationDto {
  @ApiProperty({
    enum: Hierarchy,
  })
  @IsEnum(Hierarchy)
  @IsNotEmpty()
  hierarchy: Hierarchy;

  @ApiProperty()
  @IsString()
  evaluated_by: string;

  @ApiProperty()
  @IsString()
  employee: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  competencies: string[];
}
