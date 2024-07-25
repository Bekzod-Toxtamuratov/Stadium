import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/models/stadium.models';
import { User } from '../../users/models/user.model';

interface IDCommentCreationAttr {
  name: string;
  userId: number;
  stadiumId: number;
}
@Table({ tableName: 'comment' })
export class Comments extends Model<Comments, IDCommentCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'comment Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'userId Id unikal raqami',
  })
  //   @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'stadiumId Id unikal raqami',
  })
  //   @ForeignKey(()=>Stadiums)
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;

  @ApiProperty({
    example: '1',
    description: 'impression descibtion',
  })
  @Column({
    type: DataType.STRING,
  })
  impression: string;
}
