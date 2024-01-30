import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateUserDto, CreateUserDto as User } from './users.dto';

@Injectable()
export class UsersService
{
    users: User[] = [];

    getAll(): User[] { return this.users }

    getOne(userId: string): User {
        return this.users.find( (user) => userId === user.userId );
    }

    create(userData: User): User {
        userData.userId = randomUUID();
        userData.createdAt = new Date().toISOString();
        this.users.push(userData);
        return userData;
    }

    update(userId: string, data: UpdateUserDto): User {
        let idx = this.users.findIndex(
            (user) => user.userId === userId
        );
        if (idx < 0) return;

        this.users[idx] = { ...this.users[idx], ...data };
        return this.users[idx];
    }

    delete(userId: string): User {
        let idx = this.users.findIndex(
            (user) => userId === user.userId
        );
        if (idx < 0) return;
        return this.users.splice(idx, 1)[0];
    }
}
