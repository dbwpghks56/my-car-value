import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponseDto } from './dto/response/user.response';

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
}
