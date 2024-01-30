import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateOrderDto, CreateOrderDto as Order } from './orders.dto';

@Injectable()
export class OrdersService {
    orders: Order[] = [];

    getAll(userId: string): Order[] {
        return this.orders.filter( (order) => userId === order.userId );
    }

    getOne(userId: string, orderId: string): Order {
        return this.orders.find(
            (order) => userId === order.userId && orderId === order.orderId
        );
    }

    createOrder(userId: string, orderData: Order): Order {
        orderData.userId = userId;
        orderData.orderId = randomUUID();
        orderData.createdAt = new Date().toISOString();
        this.orders.push(orderData);
        return orderData;
    }

    updateOrder(userId: string, orderId: string, data: UpdateOrderDto): Order {
        let idx = this.orders.findIndex(
            (order) => order.userId === userId && order.orderId === orderId
        );
        if (idx < 0) return;

        this.orders[idx] = { ...this.orders[idx], ...data, userId, orderId };
        return this.orders[idx];
    }

    deleteOrder(userId: string, orderId: string): Order {
        let idx = this.orders.findIndex(
            (order) => userId === order.userId && orderId === order.orderId
        );
        if (idx < 0) return;
        return this.orders.splice(idx, 1)[0];
    }
}
