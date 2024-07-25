import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface IDUser_CarsCreationAttr {
  userId: number;
  name: string;
  phone: string;
  number: string;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}
@Table({ tableName: 'user_card' })
export class UserCard extends Model<UserCard, IDUser_CarsCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'user_card Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: '',
  })
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.STRING,
  })
  number: string;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.INTEGER,
  })
  year: number;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.INTEGER,
  })
  month: number;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ApiProperty({
    example: ' ',
    description: ' descibtion',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_main: boolean;
}
