import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto, CreateUserDto } from './schemas/users.dto';

@Injectable()
export class UsersService
{
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    getAll(): Promise<User[]> { return this.userModel.find() }

    getOne(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    create(userData: CreateUserDto): Promise<User> {
        userData.created_at = new Date().toISOString();
        return this.userModel.create(userData);
    }

    update(id: string, data: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, data);
    }

    delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }
}
