import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectId.pipe';
import { UpdateUserDto, CreateUserDto as User } from './schemas/users.dto';
import { UsersService } from './users.service';
import {
    Controller, Body, Param,
    Get, Post, Patch, Delete,
    BadRequestException,
} from '@nestjs/common';

@Controller('users')
export class UsersController
{
    constructor(private readonly UsersService: UsersService) {}

    @Get()
    retrieveAll(): Promise<User[]> {
        return this.UsersService.getAll();
    }

    @Get(':id')
    retrieveUser(
        @Param('id', ParseObjectIdPipe) id:string
    ): Promise<User> {
        return this.UsersService.getOne(id)
    }

    @Post()
    createUser(@Body() data: User): Promise<User> {
        return this.UsersService.create(data)
            .catch(() => {
                throw new BadRequestException(
                    "this email is used by another user"
                )
            });
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseObjectIdPipe) id:string,
        @Body() data: UpdateUserDto
    ): Promise<User> {
        return this.UsersService.update(id, data)
            .catch(() => {
                throw new BadRequestException(
                    "this email is used by another user"
                )
            });
    }

    @Delete(':id')
    deleteUser(
        @Param('id', ParseObjectIdPipe) id:string
    ): Promise<User> {
        return this.UsersService.delete(id)
    }
}
