import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.models';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'createCategory ' })
  @ApiResponse({
    status: 200,
    description: 'The create created',
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Category ALL' })
  @ApiResponse({
    status: 200,
    description: 'The getALL categories',
    type: [Category],
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Category  ById' })
  @ApiResponse({
    status: 200,
    description: 'The getBYId categories',
    type: Category,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(+id);
  }

  @ApiOperation({ summary: 'Category  ById' })
  @ApiResponse({
    status: 200,
    description: 'The  editBYId category',
    type: Category,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategoryById(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Category deleteById' })
  @ApiResponse({
    status: 200,
    description: 'The  deleteBYId category',
    type: Category,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
