import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/models/stadium.models';

interface IStatium_timeCreationAttr {
  stadiumId: number;
  start_time: string;
  end_time: string;
  price: number;
}
@Table({ tableName: 'district' })
export class StadiumTime extends Model<StadiumTime, IStatium_timeCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'district Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'stadiumId example',
    description: 'stadiumId name',
  })
  //   @ForeignKey(()=>Stadiums)
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;

  @ApiProperty({
    example: 'price',
    description: 'price ',
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({
    example: 'start_time example',
    description: 'start_time  description',
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: 'end_time example',
    description: 'end_time  description',
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;
}
