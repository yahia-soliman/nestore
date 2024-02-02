import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://172.17.0.2:27017/nestore')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
