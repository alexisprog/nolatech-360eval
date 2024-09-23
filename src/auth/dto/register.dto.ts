import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  dni: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  first_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  last_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  position: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
