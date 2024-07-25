import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './models/media.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private readonly MediaRepo: typeof Media) {}

  create(createMediaDto: CreateMediaDto) {
    return this.MediaRepo.create(createMediaDto);
  }

  findAll() {
    return this.MediaRepo.findAll();
  }

  async findOne(id: number) {
    const media = await this.MediaRepo.findByPk(id);
    if (!media) {
      throw new NotFoundException(`media with ID ${id} not found`);
    }
    return media;
  }

  async updateMediaById(
    id: number,
    updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    const [numberOfAffectedRows, [updatedMedia]] = await this.MediaRepo.update(
      updateMediaDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`media with ID ${id} not found`);
    }
    return updatedMedia;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.MediaRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `media with ID ${id} was removed successfully.`;
      } else {
        return `media with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing media with ID ${id}: ${error.message}`);
    }
  }
}
