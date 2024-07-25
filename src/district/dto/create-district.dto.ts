import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    example: 'name example',
    description: 'description name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'region_id example',
    description: 'region_id description',
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;
}
