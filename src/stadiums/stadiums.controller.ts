import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stadiums } from './models/stadium.models';

@Controller('stadiums')
@ApiTags('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: 'bu yerda createdbyID qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been created successfully',
    type: Stadiums,
  })
  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been getALl',
    type: [Stadiums],
  })
  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getbyId qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been getbyId',
    type: Stadiums,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda editbyId qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been editbyId',
    type: Stadiums,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.updateStadiumsById(+id, updateStadiumDto);
  }

  @ApiOperation({ summary: 'bu yerda deletebyId qilinadi' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been deletebyId',
    type: Stadiums,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
