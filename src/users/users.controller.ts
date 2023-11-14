import { Body, Controller, Get, Post, Param, Query, Patch, Delete, 
    NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { User } from './domain/user.entity';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { UserResponseDto } from './dto/response/user.response';

@Controller('auth')
@Serialize<UserResponseDto>(UserResponseDto)
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Get('/colors/:color')
    setColor(
        @Param('color') color:string,
        @Session() session: any
    ) {
        session.color = color;


    }

    @Get('/colors')
    getColor(
        @Session() session: any
    ) {
        return session.color;
    }

    @Post("/signup")
    createUser(@Body() createUseDto: CreateUserDto): Promise<User> {
        console.log(createUseDto);
        
        return this.authService.signup(createUseDto.email, createUseDto.password);
    }

    @Post('/signin')
    signin(@Body() loginBody: CreateUserDto) {
        return this.authService.signIn(loginBody.email, loginBody.password);
    }

    @Get("/all")
    findUserAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get("/:id")
    // @UseInterceptors(new SerializeInterceptor(UserResponseDto))
    // @Serialize(UserResponseDto) // custom decorater
    findUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(+id);
    }

    @Get()
    findUserByEmail(@Query('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Patch("/:id")
    update(
        @Param('id') id: string,
        @Body() attr: Partial<User>
    ): Promise<UserResponseDto> {
        return this.userService.update(+id, attr)
    }

    @Delete("/:id")
    remove(
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.remove(+id);
    }
}
