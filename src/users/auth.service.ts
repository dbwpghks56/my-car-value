import {BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './domain/user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

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
        const salt = randomBytes(8).toString('hex');

        // hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        

        // return the user

    }



}