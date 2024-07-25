import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './models/user_card.models';

@Injectable()
export class UserCardsService {
  constructor(
    @InjectModel(UserCard) private readonly UserCardRepo: typeof UserCard,
  ) {}

  create(createUserCardDto: CreateUserCardDto) {
    return this.UserCardRepo.create(createUserCardDto);
  }

  findAll() {
    return this.UserCardRepo.findAll();
  }

  async findOne(id: number) {
    const user_card = await this.UserCardRepo.findByPk(id);
    if (!user_card) {
      throw new NotFoundException(`userCard with ID ${id} not found`);
    }
    return user_card;
  }

  async updateUserCardById(
    id: number,
    updateUserCardDto: UpdateUserCardDto,
  ): Promise<UserCard> {
    const [numberOfAffectedRows, [updateduserCard]] =
      await this.UserCardRepo.update(updateUserCardDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`userCard with ID ${id} not found`);
    }
    return updateduserCard;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.UserCardRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `userCard with ID ${id} was removed successfully.`;
      } else {
        return `userCard with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing userCard with ID ${id}: ${error.message}`,
      );
    }
  }
}
