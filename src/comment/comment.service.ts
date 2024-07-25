import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './models/comment.models';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments) private readonly CommentRepo: typeof Comments,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return this.CommentRepo.create(createCommentDto);
  }

  findAll() {
    return this.CommentRepo.findAll();
  }

  async findOne(id: number) {
    const comment = await this.CommentRepo.findByPk(id);
    if (!comment) {
      throw new NotFoundException(`comment with ID ${id} not found`);
    }
    return comment;
  }

  async updateCommentById(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comments> {
    const [numberOfAffectedRows, [updatedComment]] =
      await this.CommentRepo.update(updateCommentDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`comments with ID ${id} not found`);
    }
    return updatedComment;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.CommentRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `comments with ID ${id} was removed successfully.`;
      } else {
        return `comments with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing comments with ID ${id}: ${error.message}`,
      );
    }
  }
}
