import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
