import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectId.pipe';
import { CreateOrderDto, UpdateOrderDto } from './schemas/orders.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import {
    Controller, Param, Body,
    Get, Post, Patch, Delete,
} from '@nestjs/common';

@Controller('users/:user_id/orders')
export class OrdersController
{
    constructor(private readonly OrdersService: OrdersService) {}

    @Get()
    retrieveAll(
        @Param('user_id', ParseObjectIdPipe) user_id:string
    ): Promise<Order[]> {
        return this.OrdersService.getAll(user_id);
    }

    @Get(':order_id')
    retrieveOrder(
        @Param('user_id', ParseObjectIdPipe) user_id:string,
        @Param('order_id', ParseObjectIdPipe) order_id:string
    ): Promise<Order> {
        return this.OrdersService.getOne(user_id, order_id);
    }

    @Post()
    createOrder(
        @Param('user_id', ParseObjectIdPipe) user_id:string,
        @Body() data: CreateOrderDto
    ): Promise<Order> {
        return this.OrdersService.createOrder(user_id, data);
    }

    @Patch(':order_id')
    updateOrder(
        @Param('user_id', ParseObjectIdPipe) user_id:string,
        @Param('order_id', ParseObjectIdPipe) order_id:string,
        @Body() data:UpdateOrderDto,
    ): Promise<Order> {
        return this.OrdersService.updateOrder(user_id, order_id, data);
    }

    @Delete(':order_id')
    deleteOrder(
        @Param('user_id', ParseObjectIdPipe) user_id:string,
        @Param('order_id', ParseObjectIdPipe) order_id:string,
    ): Promise<Order> {
        return this.OrdersService.deleteOrder(user_id, order_id);
    }
}
