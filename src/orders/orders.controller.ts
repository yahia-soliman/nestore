import { Controller, Get, Param, Body, Delete, Post, Patch } from '@nestjs/common';

@Controller('users/:userId/orders')
export class OrdersController
{
    @Get()
    retrieveAll(@Param('userId') userId:string):string {
        return "all orders for " + userId;
    }

    @Get(':orderId')
    retrieveOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string
    ):string {
        return `you asked the order id ${orderId}, and user id ${userId}`
    }

    @Post()
    createOrder(
        @Param('userId') userId:string,
        @Body() data:any
    ):string {
        return `user ${userId}, has made an order ${JSON.stringify(data)}`
    }

    @Patch(':orderId')
    updateOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string,
        @Body() data:any,
    ):string {
        return `updated the order ${orderId} for user ${userId} with ${JSON.stringify(data)}`
    }

    @Delete(':orderId')
    deleteOrder(
        @Param('userId') userId:string,
        @Param('orderId') orderId:string,
    ):string {
        return `deleted order ${orderId} for user ${userId}`
    }
}
