import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.models';
import { Category } from '../categories/models/category.models';

@Injectable()
export class ComfortService {
  constructor(
    @InjectModel(Comfort)
    private readonly comfortRepo: typeof Comfort,
  ) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortRepo.create(createComfortDto);
  }

  findAll() {
    return this.comfortRepo.findAll();
  }

  async findOne(id: number) {
    const comfort = await this.comfortRepo.findByPk(id);
    if (!comfort) {
      throw new NotFoundException(`comfort with ID ${id} not found`);
    }
    return comfort;
  }

  async updateCategoryById(
    id: number,
    updateComfortDto: UpdateComfortDto,
  ): Promise<Comfort> {
    const [numberOfAffectedRows, [updatedComfort]] =
      await this.comfortRepo.update(updateComfortDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`comfort with ID ${id} not found`);
    }
    return updatedComfort;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.comfortRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `comfort with ID ${id} was removed successfully.`;
      } else {
        return `comfort with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing comfort with ID ${id}: ${error.message}`);
    }
  }
}
