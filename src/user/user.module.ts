import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, getConnection } from './connection/connection';
import { emailService, MailService } from './mail/mail.service';
import {
  createUserRepo,
  UserRepository,
} from './user-repository/user-repository';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useFactory: getConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: emailService,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepo,
      inject: [Connection],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
