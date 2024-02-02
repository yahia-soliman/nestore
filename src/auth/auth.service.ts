import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/schemas/users.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(data: CreateUserDto): Promise<Object> {
        const password = await bcrypt.hash(data.password, 10);
        return this.usersService.create({ ...data, password })
            .catch(() => {
                throw new ForbiddenException(
                    "this email is used by another user"
                )
            });
    }

    async login(email: string, password: string) {
        const user = await this.usersService.getOneByEmail(email);
        const ok = user && await bcrypt.compare(password, user.password);
        if (!ok) throw new ForbiddenException("wrong email or password");
        return {
            token: this.jwtService.sign(
                { email }, { secret: process.env.JWTSEC, expiresIn: '1h' }
            )
        }
    }

    async getProfile(email: string) {
        const user = await this.usersService.getOneByEmail(email);
        return `<h1>Here's your profile ${user.name}</h1>`
    }
}
