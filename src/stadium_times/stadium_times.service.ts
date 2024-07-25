import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StadiumTime } from './models/stadium_time.models';

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTime)
    private readonly StadiumTimeRepo: typeof StadiumTime,
  ) {}
  create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.StadiumTimeRepo.create(createStadiumTimeDto);
  }

  findAll() {
    return this.StadiumTimeRepo.findAll();
  }

  async findOne(id: number) {
    const stadium_time = await this.StadiumTimeRepo.findByPk(id);
    if (!stadium_time) {
      throw new NotFoundException(`stadium_time with ID ${id} not found`);
    }
    return stadium_time;
  }

  async updateStadiumTimeById(
    id: number,
    updateStadiumTimeDto: UpdateStadiumTimeDto,
  ): Promise<StadiumTime> {
    const [numberOfAffectedRows, [updatedStadiumTime]] =
      await this.StadiumTimeRepo.update(updateStadiumTimeDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`stadium_time with ID ${id} not found`);
    }
    return updatedStadiumTime;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.StadiumTimeRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `stadium_time with ID ${id} was removed successfully.`;
      } else {
        return `stadium_time with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing stadium_time with ID ${id}: ${error.message}`,
      );
    }
  }
}
