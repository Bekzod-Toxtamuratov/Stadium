import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: 'name example',
    description: 'Foydalanuvchi name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    example: 'parent_id example',
    description: 'controller parent_id',
  })
  @IsNumber()
  @IsNotEmpty()
  parent_id: number;
}