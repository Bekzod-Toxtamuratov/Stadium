import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './models/region.models';

@Controller('region')
@ApiTags('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'created post ' })
  @ApiResponse({
    status: 201,
    description: 'The create created.',
    type: Region,
  })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'getALL  ' })
  @ApiResponse({
    status: 200,
    description: 'The getALL .',
    type: [Region],
  })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'getById  ' })
  @ApiResponse({
    status: 200,
    description: 'The getById .',
    type: Region,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'editById' })
  @ApiResponse({
    status: 200,
    description: 'The editById',
    type: Region,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.updateRegionById(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'deteleById' })
  @ApiResponse({
    status: 200,
    description: 'The deleteById',
    type: Region,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
