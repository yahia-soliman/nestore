import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectId.pipe';
import { CreateOrderDto, UpdateOrderDto } from './schemas/orders.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import {
    Controller, Param, Body,
    Get, Post, Patch, Delete,
    UseGuards,
    Request,
} from '@nestjs/common';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController
{
    constructor(private readonly OrdersService: OrdersService) {}

    @Get()
    retrieveAll(@Request() {user_id}): Promise<Order[]> {
        return this.OrdersService.getAll(user_id);
    }

    @Get(':order_id')
    retrieveOrder(
        @Request() {user_id},
        @Param('order_id', ParseObjectIdPipe) order_id:string
    ): Promise<Order> {
        return this.OrdersService.getOne(user_id, order_id);
    }

    @Post()
    createOrder(
        @Request() {user_id},
        @Body() data: CreateOrderDto
    ): Promise<Order> {
        return this.OrdersService.createOrder(user_id, data);
    }

    @Patch(':order_id')
    updateOrder(
        @Request() {user_id},
        @Param('order_id', ParseObjectIdPipe) order_id:string,
        @Body() data:UpdateOrderDto,
    ): Promise<Order> {
        return this.OrdersService.updateOrder(user_id, order_id, data);
    }

    @Delete(':order_id')
    deleteOrder(
        @Request() {user_id},
        @Param('order_id', ParseObjectIdPipe) order_id:string,
    ): Promise<Order> {
        return this.OrdersService.deleteOrder(user_id, order_id);
    }
}
