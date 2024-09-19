import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  dni: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  position: string;
}
