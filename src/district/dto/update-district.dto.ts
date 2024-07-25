import { PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  region_id?: number;
}
