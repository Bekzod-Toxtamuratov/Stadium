import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDMediaCreationAttr {
  stadiumId: number;
  photo: string;
  description: string;
}
@Table({ tableName: 'media' })
export class Media extends Model<Media, IDMediaCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'media Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'photo example',
    description: 'photo name',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: 'description example',
    description: 'description description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: 'stadiumId example',
    description: 'stadiumId description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;
}
