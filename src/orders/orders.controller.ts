import { Controller, Get, Param, Body, Delete, Post, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('users/:userId/orders')
export class OrdersController
{
    constructor(private readonly OrdersService: OrdersService) {}

    @Get()
    retrieveAll(@Param('userId') userId:string):any {
        return this.OrdersService.getAll(userId);
    }

    @Get(':orderId')
    retrieveOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string
    ):any {
        return this.OrdersService.getOne(userId, orderId);
    }

    @Post()
    createOrder(
        @Param('userId') userId:string,
        @Body() data:any
    ):any {
        return this.OrdersService.createOrder(userId, data);
    }

    @Patch(':orderId')
    updateOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string,
        @Body() data:any,
    ):string {
        return this.OrdersService.updateOrder(userId, orderId, data);
    }

    @Delete(':orderId')
    deleteOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string,
    ):string {
        return this.OrdersService.deleteOrder(userId, orderId);
    }
}
