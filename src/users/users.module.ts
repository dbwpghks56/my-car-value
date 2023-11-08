import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './domain/user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // create repository?
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
