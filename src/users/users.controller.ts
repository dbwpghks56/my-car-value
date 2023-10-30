import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { User } from './domain/user.entity';
import { UserResponseDto } from './dto/response/user.response';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post("/signup")
    createUser(@Body() createUseDto: CreateUserDto): Promise<UserResponseDto> {
        console.log(createUseDto);
        
        return this.userService.create(createUseDto);
    }
}
