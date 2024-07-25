import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    example: 'photo example',
    description: 'photo  description',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: 'description example',
    description: '(description)  description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'stadiumId example',
    description: 'stadiumId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  stadiumId: number;
}
