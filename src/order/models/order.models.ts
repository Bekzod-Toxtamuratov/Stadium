import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICOrderCreationAttr {
  name: string;
  userId: number;
  st_timesId: number;
  date: string;
  createdAt: string;
}
@Table({ tableName: 'order' })
export class Order extends Model<Order, ICOrderCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'category Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Column({
    type: DataType.INTEGER,
  })
  st_timesId: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Column({
    type: DataType.STRING,
  })
  date: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Column({
    type: DataType.STRING,
  })
  createdAt: string;
}
