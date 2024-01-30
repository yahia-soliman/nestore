import { CreateOrderDto as Order, UpdateOrderDto } from './orders.dto';
import { OrdersService } from './orders.service';
import {
    Controller, Param, Body,
    Get, Post, Patch, Delete,
    HttpException, HttpStatus,
    ParseUUIDPipe
} from '@nestjs/common';

@Controller('users/:userId/orders')
export class OrdersController
{
    constructor(private readonly OrdersService: OrdersService) {}

    @Get()
    retrieveAll(
        @Param('userId', ParseUUIDPipe) userId:string
    ): Order[] {
        return this.OrdersService.getAll(userId);
    }

    @Get(':orderId')
    retrieveOrder(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Param('orderId', ParseUUIDPipe) orderId:string
    ): Order {
        let order = this.OrdersService.getOne(userId, orderId);
        if (!order)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return order;
    }

    @Post()
    createOrder(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Body() data:Order
    ): Order {
        return this.OrdersService.createOrder(userId, data);
    }

    @Patch(':orderId')
    updateOrder(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Param('orderId', ParseUUIDPipe) orderId:string,
        @Body() data:UpdateOrderDto,
    ): Order {
        let order = this.OrdersService.updateOrder(userId, orderId, data);
        if (!order)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return order;
    }

    @Delete(':orderId')
    deleteOrder(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Param('orderId', ParseUUIDPipe) orderId:string,
    ): Order {
        let order = this.OrdersService.deleteOrder(userId, orderId);
        if (!order)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return order;
    }
}
