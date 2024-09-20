import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEvaluationDto } from './create-evaluation.dto';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}

export class Feedbacks {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competency: string;

  @ApiProperty()
  @IsNumber()
  value: number;
}
export class FeedbackEvaluationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  evaluation_id: string;

  @ApiProperty({
    isArray: true,
    type: Feedbacks,
  })
  @IsArray()
  @IsNotEmpty()
  feedbacks: Feedbacks[];
}
