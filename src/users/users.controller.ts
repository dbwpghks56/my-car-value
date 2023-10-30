import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post("/signup")
    createUser(@Body() createUseDto: CreateUserDto) {
        console.log(createUseDto);
    }
}
