import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StadiumTime } from './models/stadium_time.models';

@Controller('stadium_times')
@ApiTags('stadium-times')
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

  @ApiOperation({ summary: 'created post ' })
  @ApiResponse({
    status: 201,
    description: 'The create created.',
    type: StadiumTime,
  })
  @Post()
  create(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

  @ApiOperation({ summary: 'getALL  ' })
  @ApiResponse({
    status: 200,
    description: 'The getALl created.',
    type: [StadiumTime],
  })
  @Get()
  findAll() {
    return this.stadiumTimesService.findAll();
  }

  @ApiOperation({ summary: 'getbyID ' })
  @ApiResponse({
    status: 200,
    description: 'The getbyId desci.',
    type: StadiumTime,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumTimesService.findOne(+id);
  }

  @ApiOperation({ summary: 'editbyID ' })
  @ApiResponse({
    status: 200,
    description: 'The editbyId desci.',
    type: StadiumTime,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto,
  ) {
    return this.stadiumTimesService.updateStadiumTimeById(
      +id,
      updateStadiumTimeDto,
    );
  }

  @ApiOperation({ summary: 'deletebyID ' })
  @ApiResponse({
    status: 200,
    description: 'The deletebyId descibtion.',
    type: StadiumTime,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumTimesService.remove(+id);
  }
}
