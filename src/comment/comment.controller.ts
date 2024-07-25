import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comments } from './models/comment.models';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'this code creates a comment' })
  @ApiResponse({
    status: 201,
    description: 'The create created.',
    type: Comments,
  })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'this code getALl a comment' })
  @ApiResponse({
    status: 200,
    description: 'The  getALl',
    type: [Comments],
  })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'this code getbyId a comment' })
  @ApiResponse({
    status: 200,
    description: 'The  getbyId',
    type: Comments,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({ summary: 'this code editbyId a comment' })
  @ApiResponse({
    status: 200,
    description: 'The  editbyId',
    type: Comments,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateCommentById(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'this code deletebyId a comment' })
  @ApiResponse({
    status: 200,
    description: 'The  deletebyId',
    type: Comments,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
