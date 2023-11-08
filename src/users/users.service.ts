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
    create(createUserDto: CreateUserDto): Promise<User> {
        // 이렇게 create 로 객체를 만들어야 Hooks ( Afterinsert 등)이 작동한다.
        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {email: email}
        });
    }

    findById(id: number): Promise<User> {
        console.log(id);
        return this.userRepository.findOne({
            where: { id: id }
        });
    }

    async update(id: number, attr: Partial<UpdateUserDto>): Promise<User> {
        const userInstance: User = await this.findById(id);

        Object.assign(userInstance, attr);

        return this.userRepository.save(userInstance);
    }

    async remove(id: number): Promise<User> {
        const userInstance: User = await this.findById(id);

        return this.userRepository.remove(userInstance);
    }
}
