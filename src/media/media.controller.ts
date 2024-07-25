import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Media } from './models/media.models';

@Controller('media')
@ApiTags('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'this code create' })
  @ApiResponse({
    status: 201,
    description: 'The resource has been created.',
    type: Media,
  })
  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'this code get' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been get.',
    type: [Media],
  })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'this code getbyId' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been getbyId.',
    type: Media,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({ summary: 'this code editbyId' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been editbyId.',
    type: Media,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.updateMediaById(+id, updateMediaDto);
  }

  @ApiOperation({ summary: 'this code deletebyId' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been deletebyId.',
    type: Media,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
