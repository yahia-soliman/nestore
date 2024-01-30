import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { OrdersModule } from '../orders/orders.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [OrdersModule],
  providers: [UsersService]
})
export class UsersModule {}
