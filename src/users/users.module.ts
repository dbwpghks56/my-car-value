import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './domain/user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [
    // create repository?
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService,],
  exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  } 
}
