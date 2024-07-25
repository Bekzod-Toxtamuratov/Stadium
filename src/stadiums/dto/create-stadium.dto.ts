import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({
    example: 'stadium example',
    description: 'stadium  description',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'categoryId example',
    description: 'categoryId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 'ownerId example',
    description: 'ownerId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({
    example: 'regionId example',
    description: 'regionId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 'districtId example',
    description: 'districtId  description',
  })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    example: 'contact_with example',
    description: 'contact_with  description',
  })
  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @ApiProperty({
    example: 'volume example',
    description: 'volume  description',
  })
  @IsString()
  @IsNotEmpty()
  volume: string;

  @ApiProperty({
    example: 'address example',
    description: 'address  description',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'location example',
    description: 'location  description',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'buildAt example',
    description: 'buildAt  description',
  })
  @IsString()
  @IsNotEmpty()
  buildAt: string;

  @ApiProperty({
    example: 'start_time example',
    description: 'start_time  description',
  })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    example: 'end_time example',
    description: 'end_time  description',
  })
  @IsString()
  @IsNotEmpty()
  end_time: string;
}
/* categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  regionId: number;
  districtId: number;
  location: string;
  buildAt: string;
  start_time: string;
  end_time: string; */
