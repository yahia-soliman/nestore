import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController
{
    @Get()
    retrieveAll():string {
        return "all users"
    }

    @Get(':id')
    retrieveUser(@Param('id') id:string):string {
        return `you asked for ${id}`
    }

    @Post()
    createUser():string {
        return "succesfully created the user"
    }

    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() data:any):string {
        return `updated ${id} with ${JSON.stringify(data)}`
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string):string {
        return `deleted ${id}`
    }
}
