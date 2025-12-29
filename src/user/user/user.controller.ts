import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Res,
  Redirect,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
  ) {}

  @Get('/connection')
  getConnection(): string {
    this.mailService.sendEmail();
    this.userRepository.save();
    return this.connection.getName();
  }

  @Get('/user')
  async sayHello(@Query('name') name: string): Promise<string> {
    const greeting = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(this.service.sayHello(name));
      }, 100);
    });
    return greeting;
  }
  @Get('/views/hello')
  hello(@Query('nama') nama: string, @Res() response: Response): void {
    response.render('index.html', {
      title: 'nestjs app',
      test: nama,
    });
  }
  @Get('/set-cookie')
  setCookie(@Query('nama') nama: string, @Res() response: Response): void {
    response.cookie('nama', nama);
    response.status(200).send('Success set cookie');
  }
  @Post()
  post(): string {
    return 'Post';
  }

  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @Get('sample-response')
  sampleResponse(): Record<string, string> {
    return {
      data: 'helo nest',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: 'api/users/sample-response',
      statusCode: 301,
    };
  }
  @Get('/auth')
  get(): string {
    return 'get method';
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `hello ${id}`;
  }
}
