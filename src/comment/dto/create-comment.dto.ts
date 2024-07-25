import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'impression example',
    description: 'impression name',
  })
  @IsString()
  @IsNotEmpty()
  impression: string;

  @ApiProperty({
    example: 'region_id example',
    description: 'region_id description',
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 'userId example',
    description: 'userId description',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
