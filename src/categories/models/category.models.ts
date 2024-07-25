import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICategoryCreationAttr {
  name: string;
  parent_id: number;
}
@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryCreationAttr> {
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
    example: 'Futbol',
    description: 'category name',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parent_id: number;
  @BelongsTo(() => Category)
  category: Category;
}
