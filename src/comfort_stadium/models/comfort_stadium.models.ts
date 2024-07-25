import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/models/stadium.models';
import { Comfort } from '../../comfort/models/comfort.models';

interface ICSComfortStadiumCreationAttr {
  name: string;
  stadiumId: number;
  comfortId: number;
}
@Table({ tableName: 'comfort_stadium' })
export class ComfortStadium extends Model<
  ComfortStadium,
  ICSComfortStadiumCreationAttr
> {
  @ApiProperty({
    example: '1',
    description: 'comfort_stadium Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'name example',
    description: 'neme description',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  //   @ForeignKey(() => Stadiums)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  //   @ForeignKey(() => Comfort)
  @Column({ type: DataType.INTEGER })
  comfortId: number;
}
