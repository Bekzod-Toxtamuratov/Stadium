import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadiums } from './models/stadium.models';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadiums) private readonly stadiumsRepo: typeof Stadiums,
  ) {}

  create(createStadiumDto: CreateStadiumDto) {
    return this.stadiumsRepo.create(createStadiumDto);
  }

  findAll() {
    return this.stadiumsRepo.findAll();
  }

  async findOne(id: number) {
    const region = await this.stadiumsRepo.findByPk(id);
    if (!region) {
      throw new NotFoundException(`stadiums with ID ${id} not found`);
    }
    return region;
  }

  async updateStadiumsById(
    id: number,
    updateStadiumDto: UpdateStadiumDto,
  ): Promise<Stadiums> {
    const [numberOfAffectedRows, [updatedStadiums]] =
      await this.stadiumsRepo.update(updateStadiumDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`stadiums with ID ${id} not found`);
    }
    return updatedStadiums;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.stadiumsRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `stadiums with ID ${id} was removed successfully.`;
      } else {
        return `stadiums with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing stadiums with ID ${id}: ${error.message}`,
      );
    }
  }
}
