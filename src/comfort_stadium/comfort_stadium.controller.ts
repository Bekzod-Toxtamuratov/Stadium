import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ComfortStadium } from './models/comfort_stadium.models';

@Controller('comfort_stadium')
@ApiTags('Comfort_stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @ApiOperation({ summary: 'bu yerda post qilinadi' })
  @ApiResponse({
    status: 201,
    description: 'The resource has been created.',
    type: ComfortStadium,
  })
  @Post()
  create(@Body() createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been get.',
    type: [ComfortStadium],
  })
  @Get()
  findAll() {
    return this.comfortStadiumService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getbyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been get.',
    type: ComfortStadium,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortStadiumService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda putchbyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been putch.',
    type: ComfortStadium,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComfortStadiumDto: UpdateComfortStadiumDto,
  ) {
    return this.comfortStadiumService.updateComfort_StadiumsById(
      +id,
      updateComfortStadiumDto,
    );
  }

  @ApiOperation({ summary: 'bu yerda deletebyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been delete',
    type: ComfortStadium,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
