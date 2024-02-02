import { CreateUserDto, UpdateUserDto } from 'src/users/schemas/users.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {
    Controller, Request, UseGuards,
    Post, Get, Body
} from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    @Post('register')
    async register(@Body() data: CreateUserDto) {
        return this.AuthService.register(data);
    }

    @Post('login')
    async login(@Body() data: UpdateUserDto) {
        return this.AuthService.login(data.email, data.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    userProfile(@Request() req) {
        return this.AuthService.getProfile(req.email)
    }
}
