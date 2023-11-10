import {BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './domain/user.entity';
import { randomBytes, scrypt } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {

    }

    async signup(email: string, password: string) {
        // See if email is in use
        const users:User = await this.userService.findByEmail(email);

        if(users) {
            throw new BadRequestException('email in use');
        }

        // Hash the users password 
        // Generate a salt

        // hash the salt and the password together

        // join the hashed result and the salt together



        // Create a new user and save it

        // return the user

    }



}