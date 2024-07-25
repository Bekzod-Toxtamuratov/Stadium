import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.models';
import { error } from 'console';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepo: typeof Category,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.findAll({ include: { all: true } });
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      const category = Category.findByPk(id);
      return category;
    } catch (error) {
      throw new Error(`Failed to get category: ${error}`);
    }
  }
  async updateCategoryById(
    id: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<Category> {
    const [numberOfAffectedRows, [updatedCategory]] =
      await this.categoryRepo.update(updateCategory, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.categoryRepo.destroy({ where: { id } });

      console.log('affectedRows : ', affectedRows);
      if (affectedRows > 0) {
        return `category with ID ${id} was removed successfully.`;
      } else {
        return `category with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing category with ID ${id}: ${error.message}`,
      );
    }
  }
}
