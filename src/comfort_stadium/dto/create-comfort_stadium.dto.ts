import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComfortStadiumDto {
  @ApiProperty({
    example: 'name example',
    description: 'name  description',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'stadiumId example',
    description: 'stadiumId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  stadiumId: number;

  @ApiProperty({
    example: 'comfortId example',
    description: 'comfortId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  comfortId: number;
}
