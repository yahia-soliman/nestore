import { Injectable } from '@nestjs/common';
import { UpdateOrderDto, CreateOrderDto } from './schemas/orders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>){}

    getAll(user_id: string): Promise<Order[]> {
        return this.orderModel.find({user_id});
    }

    getOne(user_id: string, order_id: string): Promise<Order> {
        return this.orderModel.findOne({_id: order_id, user_id });
    }

    createOrder(user_id: string, orderData: CreateOrderDto): Promise<Order> {
        orderData.created_at = new Date().toISOString();
        return this.orderModel.create({...orderData, user_id});
    }

    updateOrder(
        user_id: string, order_id: string, updates: UpdateOrderDto
    ): Promise<Order> {
        return this.orderModel
            .findOneAndUpdate( { _id: order_id, user_id }, updates);
    }

    deleteOrder(user_id: string, order_id: string): Promise<Order> {
        return this.orderModel.findOneAndDelete({_id: order_id, user_id});
    }
}
