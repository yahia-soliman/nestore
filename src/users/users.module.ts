import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  controllers: [UsersController],
  imports: [OrdersModule]
})
export class UsersModule {}
