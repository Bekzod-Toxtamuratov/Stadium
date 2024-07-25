import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ComfortStadium } from './models/comfort_stadium.models';

@Injectable()
export class ComfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium)
    private readonly comfort_stadiumsRepo: typeof ComfortStadium,
  ) {}

  create(createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfort_stadiumsRepo.create(createComfortStadiumDto);
  }

  findAll() {
    return this.comfort_stadiumsRepo.findAll();
  }

  async findOne(id: number) {
    const comfort_stadium = await this.comfort_stadiumsRepo.findByPk(id);
    if (!comfort_stadium) {
      throw new NotFoundException(`comfort_stadiums with ID ${id} not found`);
    }
    return comfort_stadium;
  }

  async updateComfort_StadiumsById(
    id: number,
    updateComfortStadiumDto: UpdateComfortStadiumDto,
  ): Promise<ComfortStadium> {
    const [numberOfAffectedRows, [updatedComfortStadiums]] =
      await this.comfort_stadiumsRepo.update(updateComfortStadiumDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`comfor_stadiums with ID ${id} not found`);
    }
    return updatedComfortStadiums;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.comfort_stadiumsRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `comfort_stadiums with ID ${id} was removed successfully.`;
      } else {
        return `comfort_stadiums with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing comfort_stadiums with ID ${id}: ${error.message}`,
      );
    }
  }
}
