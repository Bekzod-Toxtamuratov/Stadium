import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import {
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comfort } from './models/comfort.models';

@Controller('comfort')
@ApiTags('Comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: 'this code create' })
  @ApiResponse({
    status: 201,
    description: 'The resource has been created.',
    type: Comfort,
  })
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: 'this code getALL' })
  @ApiResponse({
    status: 200,
    description: 'The code getALL.',
  })
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: 'this code getById' })
  @ApiResponse({
    status: 200,
    description: 'The code getBYID.',
    type: Comfort,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }

  @ApiOperation({ summary: 'this code putchById' })
  @ApiResponse({
    status: 200,
    description: 'The code putchById.',
    type: Comfort,
  })
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
  //   return this.comfortService.updateComfortById(+id, updateComfortDto);
  // }
  @ApiOperation({ summary: 'this code deleteById' })
  @ApiResponse({
    status: 200,
    description: 'List of Users',
    type: Comfort,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
