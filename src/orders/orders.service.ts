import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
    orders = [];

    getAll(userId: string): any[] {
        return this.orders.filter(
            (order) => userId === order.userId
        )
    }

    getOne(userId: string, orderId: string): any {
        return this.orders.find(
            (order) => userId === order.userId && orderId === order.orderId
        )
    }

    createOrder(userId: string, data: any): any {
        let new_order = { ...data, userId, orderId: randomUUID() }
        this.orders.push(new_order)
        return new_order
    }

    updateOrder(userId: string, orderId: string, data: any): any {
        let idx = this.orders.findIndex(
            (order) => order.userId === userId && order.orderId === orderId
        )
        if (idx < 0) return { error: "not found" };

        this.orders[idx] = { ...this.orders[idx], ...data, userId, orderId };
        return this.orders[idx];
    }

    deleteOrder(userId: string, orderId: string): any {
        let idx = this.orders.findIndex(
            (order) => userId === order.userId && orderId === order.orderId
        )
        if (idx < 0) return { error: "not found" };
        return this.orders.splice(idx, 1)[0];
    }
}
