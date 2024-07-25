import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComfortDto {
  @ApiProperty({
    example: 'Bekzod',
    description: 'Foydalanuvchi name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
