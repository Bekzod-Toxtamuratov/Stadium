import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserCardDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsNumber()
  month: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_main: boolean;
}
