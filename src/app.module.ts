import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/domain/user.entity';
import { Report } from './reports/domain/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule, 
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'svc.sel5.cloudtype.app',
    //   port: 32119,
    //   username: 'root',
    //   password: 'mydb123',
    //   database: 'postgres',
    //   entities: [User, Report],
    //   // 데이터베이스의 테이블을 살펴본 뒤 구조를 자동으로 업데이트한다.
    //   // jpa 로 치면 ddl: update 너낌
    //   synchronize: true,
    //   logging: true
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: 32119,
          username: 'root',
          password: 'mydb123',
          database: 'postgres',
          entities: [User, Report],
          // 데이터베이스의 테이블을 살펴본 뒤 구조를 자동으로 업데이트한다.
          // jpa 로 치면 ddl: update 너낌
          synchronize: true,
          logging: true
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['asdfasfd'],
        }),
      )
      .forRoutes('*');
  }
}
