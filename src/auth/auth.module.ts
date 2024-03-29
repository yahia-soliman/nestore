import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService]
})
export class AuthModule {}
