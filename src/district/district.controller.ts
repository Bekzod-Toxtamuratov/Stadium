import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import {
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { District } from './models/district.models';

@Controller('district')
@ApiTags('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'createDistrict' })
  @ApiResponse({
    status: 201,
    description: 'The create created.',
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'getALLDistrict' })
  @ApiResponse({
    status: 200,
    description: 'The getALL alldistrict',
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'get byID district' })
  @ApiResponse({
    status: 200,
    description: 'The getbyId district',
    type: District,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'putch by district' })
  @ApiResponse({
    status: 200,
    description: 'The putchById district',
    type: District,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrictById(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'delete by district' })
  @ApiResponse({
    status: 200,
    description: 'The deleteBy district',
    type: District,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
