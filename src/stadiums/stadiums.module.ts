import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import {Stadiums } from './models/stadium.models';

@Module({
  imports:[SequelizeModule.forFeature([Stadiums])],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
