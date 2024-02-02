import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.DBURL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
