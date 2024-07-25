import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'name example',
    description: 'description name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
