import { Body, Controller, Get, Post, Param, Query, Patch, Delete, 
    NotFoundException, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { User } from './domain/user.entity';
import { UserResponseDto } from './dto/response/user.response';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post("/signup")
    createUser(@Body() createUseDto: CreateUserDto): Promise<UserResponseDto> {
        console.log(createUseDto);
        
        return this.userService.create(createUseDto);
    }

    @Get("/all")
    findUserAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
    }

    @Get("/:id")
    // @UseInterceptors(new SerializeInterceptor(UserResponseDto))
    // @Serialize(UserResponseDto) // custom decorater
    findUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(+id);
    }

    @Get()
    findUserByEmail(@Query('email') email: string): Promise<UserResponseDto> {
        return this.userService.findByEmail(email);
    }

    @Patch("/:id")
    update(
        @Param('id') id: string,
        @Body() attr: Partial<UpdateUserDto>
    ): Promise<UserResponseDto> {
        return this.userService.update(+id, attr)
    }

    @Delete("/:id")
    remove(
        @Param('id') id: string
    ): Promise<UserResponseDto> {
        return this.userService.remove(+id);
    }
}
