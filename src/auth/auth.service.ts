import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/schemas/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

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
        return "welcome " + user.name;
    }
}
