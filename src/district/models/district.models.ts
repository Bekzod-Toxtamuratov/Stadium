import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDictrictCreationAttr {
  name: string;
  regionId: number;
}
@Table({ tableName: 'district' })
export class District extends Model<District, IDictrictCreationAttr> {
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

  @ApiProperty({
    example: 'Toshkent',
    description: 'description Toshkent',
  })
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;
}
