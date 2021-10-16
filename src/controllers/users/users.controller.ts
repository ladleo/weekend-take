import { Body, Controller, Param, Post } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { CreateUserDto, UserDto } from '../../dto/UserDto';
import { UserService } from '../../services/UserService';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Post()
  findAll(): Promise<User[]> {
    return this.userService
      .findAll()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  @Post('create')
  store(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService
      .create(createUserDto)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  @Post(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post(':id/update')
  update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.userService.update(id, createUserDto);
  }

  @Post(':id/delete')
  delete(@Param('id') id: string): Promise<any> {
    return this.userService.delete(id);
  }
}
