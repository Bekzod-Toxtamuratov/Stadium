import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.models';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private readonly OrderRepo: typeof Order) {}
  create(createOrderDto: CreateOrderDto) {
    return this.OrderRepo.create(createOrderDto);
  }

  findAll() {
    return this.OrderRepo.findAll();
  }

  async findOne(id: number) {
    const order = await this.OrderRepo.findByPk(id);
    if (!order) {
      throw new NotFoundException(`order with ID ${id} not found`);
    }
    return order;
  }

  async updateOrderById(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const [numberOfAffectedRows, [updatedOrder]] = await this.OrderRepo.update(
      updateOrderDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<string> {
    try {
      const affectedRows = await this.OrderRepo.destroy({ where: { id } });
      if (affectedRows > 0) {
        return `order with ID ${id} was removed successfully.`;
      } else {
        return `order with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing order with ID ${id}: ${error.message}`);
    }
  }
}
