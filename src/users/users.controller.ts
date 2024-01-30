import { UpdateUserDto, CreateUserDto as User } from './users.dto';
import { UsersService } from './users.service';
import {
    Controller, Body, Param,
    Get, Post, Patch, Delete, 
    HttpException, HttpStatus,
    ParseUUIDPipe
} from '@nestjs/common';

@Controller('users')
export class UsersController
{
    constructor(private readonly UsersService: UsersService) {}

    @Get()
    retrieveAll(): User[] {
        return this.UsersService.getAll();
    }

    @Get(':id')
    retrieveUser(
        @Param('id', ParseUUIDPipe) id:string
    ): User {
        let user = this.UsersService.getOne(id);
        if (!user)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return user;
    }

    @Post()
    createUser(@Body() data: User): User {
        let user = this.UsersService.create(data);
        if (!user)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return user;
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseUUIDPipe) id:string,
        @Body() data: UpdateUserDto
    ): User {
        let user = this.UsersService.update(id, data);
        if (!user)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return user;
    }

    @Delete(':id')
    deleteUser(
        @Param('id', ParseUUIDPipe) id:string
    ): User {
        let user = this.UsersService.delete(id);
        if (!user)
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
        return user;
    }
}
