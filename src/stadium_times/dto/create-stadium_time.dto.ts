import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStadiumTimeDto {
  @ApiProperty({
    example: 'stadiumId example',
    description: 'stadiumId  description',
  })
  @IsNotEmpty()
  @IsNumber()
  stadiumId: number;

  @ApiProperty({
    example: 'start_time example',
    description: 'start_time  description',
  })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({
    example: 'end_time example',
    description: 'end_time  description',
  })
  @IsNotEmpty()
  @IsString()
  end_time: string;

  @ApiProperty({
    example: 'price example',
    description: 'price  description',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
