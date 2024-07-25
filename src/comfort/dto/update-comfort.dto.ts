import { PartialType } from '@nestjs/swagger';
import { CreateComfortDto } from './create-comfort.dto';
import {IsNotEmpty,IsOptional,IsString} from 'class-validator';

export class UpdateComfortDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
