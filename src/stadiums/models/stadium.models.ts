import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../categories/models/category.models';
import { Region } from '../../region/models/region.models';
import { District } from '../../district/models/district.models';

interface ISStadiumCreationAttr {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  regionId: number;
  districtId: number;
  location: string;
  buildAt: string;
  start_time: string;
  end_time: string;
}
@Table({ tableName: 'stadiums' })
export class Stadiums extends Model<Stadiums, ISStadiumCreationAttr> {
  @ApiProperty({
    example: '1',
    description: 'stadiums Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'categoryId example',
    description: 'categoryId describtion',
  })
  //   @ForeignKey(()=>Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ApiProperty({
    example: 'regionId example',
    description: 'regionId describtion',
  })
  //     @ForeignKey(()=>Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @ApiProperty({
    example: 'ownerId example',
    description: 'ownerId describtion',
  })
  //     @ForeignKey(()=>Owner)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @ApiProperty({
    example: 'districtId example',
    description: 'districtId describtion',
  })
  //    @ForeignKey(()=>District)
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

  @ApiProperty({
    example: 'stadiems example',
    description: 'stadiums description',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 'contact_with example',
    description: 'contact_with description:',
  })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({
    example: 'volume example',
    description: 'volume description:',
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: 'address example',
    description: 'address description:',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: 'location example',
    description: 'location description:',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: 'buildAt example',
    description: 'buildAt description:',
  })
  @Column({
    type: DataType.STRING,
  })
  buildAt: string;

  @ApiProperty({
    example: 'start_time example',
    description: 'start_time description:',
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: 'end_time example',
    description: 'end_time description:',
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;
}
//  categoryId: 1
//  ownerId: number;
//  contact_with: string;
//  name: string;
//  volume: string;
//  address: string;
//  regionId: number;
//  districtId: number;
//  location: string;
//  buildAt: string;
//  start_time: string;
//  end_time: string;
