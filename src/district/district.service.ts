import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './models/district.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly DistrictRepo: typeof District,
  ) {}
  create(createDistrictDto: CreateDistrictDto) {
    return this.DistrictRepo.create(createDistrictDto);
  }

  findAll() {
    return this.DistrictRepo.findAll();
  }

  async findOne(id: number) {
    const distrcit = await this.DistrictRepo.findByPk(id);
    if (!distrcit) {
      throw new NotFoundException(`distrcit with ID ${id} not found`);
    }
    return distrcit;
  }

  async updateDistrictById(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const [numberOfAffectedRows, [updatedDistrict]] =
      await this.DistrictRepo.update(updateDistrictDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`district with ID ${id} not found`);
    }
    return updatedDistrict;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.DistrictRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `district with ID ${id} was removed successfully.`;
      } else {
        return `district with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing district with ID ${id}: ${error.message}`,
      );
    }
  }
}
