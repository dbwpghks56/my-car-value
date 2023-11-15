import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './domain/user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [
    // create repository?
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, 
    { // 전역으로 설정
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
