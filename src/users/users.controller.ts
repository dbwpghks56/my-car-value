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

    @Get('/whoami')
    whoAmI(@Session() session: any): Promise<User> {
        return this.userService.findById(session.userId);
    }

    @Get('/logout')
    signOut(@Session() session:any) {
        session.userId = null;
    }

    @Post("/signup")
    async createUser(@Body() createUseDto: CreateUserDto, @Session() session: any): Promise<User> {
        console.log(createUseDto);
        
        const user = await this.authService.signup(createUseDto.email, createUseDto.password);

        session.userId = user.id;

        return user;
    }

    @Post('/signin')
    async signin(@Body() loginBody: CreateUserDto, @Session() session: any): Promise<User> {
        const user = await this.authService.signIn(loginBody.email, loginBody.password);

        session.userId = user.id;

        return user;
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
