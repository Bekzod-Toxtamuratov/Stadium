import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly RegionRepo: typeof Region,
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.RegionRepo.create(createRegionDto);
  }

  findAll() {
    return this.RegionRepo.findAll();
  }

  async findOne(id: number) {
    const region = await this.RegionRepo.findByPk(id);
    if (!region) {
      throw new NotFoundException(`region with ID ${id} not found`);
    }
    return region;
  }

  async updateRegionById(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const [numberOfAffectedRows, [updatedRegion]] =
      await this.RegionRepo.update(updateRegionDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`region with ID ${id} not found`);
    }
    return updatedRegion;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.RegionRepo.destroy({ where: { id } });
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
