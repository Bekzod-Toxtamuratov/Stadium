import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDRegionCreationAttr {
  name: string;
}
@Table({ tableName: 'region' })
export class Region extends Model<Region, IDRegionCreationAttr> {
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
    example: 'name example',
    description: 'disctirct name',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;


}
