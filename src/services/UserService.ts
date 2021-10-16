import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '../dto/UserDto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<any> {
    return this.userModel.updateOne(
      { _id: id },
      { $set: { username: createUserDto.username } },
    );
  }

  async delete(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id });
  }
}
