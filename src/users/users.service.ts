import { Injectable, NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponseDto } from './dto/response/user.response';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    /**
     * 
     * @param createUserDto 
     * @returns 
     */
    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        // 이렇게 create 로 객체를 만들어야 Hooks ( Afterinsert 등)이 작동한다.
        const user = this.userRepository.create(createUserDto);

        return (await this.userRepository.save(user)).toResponse();
    }

    async findAll(): Promise<UserResponseDto[]> {
        return (await this.userRepository.find()).map(user => user.toResponse());
    }

    async findByEmail(email: string): Promise<UserResponseDto> {
        return (await this.userRepository.findOne({
            where: {email: email}
        })).toResponse();
    }

    async findById(id: number): Promise<UserResponseDto> {
        return (await this.userRepository.findOne({
            where: { id: id }
        })).toResponse();
    }

    async update( id: number, attr: Partial<UpdateUserDto> ): Promise<UserResponseDto> {
        const userInstance: User = await this.userRepository.findOne(({where: {id: id}})).catch(() => {throw new NotFoundException()});
        
        Object.assign(userInstance, attr);

        return (await this.userRepository.save(userInstance)).toResponse();
    }

    async remove(id: number): Promise<UserResponseDto> {
        const userInstance: User = await this.userRepository.findOne(({ where: { id: id } })).catch(() => { throw new NotFoundException() });

        return (await this.userRepository.remove(userInstance)).toResponse();
    }
}
