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

@Controller('/api/users')
export class UserController {
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

  @Get('/user')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    const greeting = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`hello ${firstName} ${lastName}`);
      }, 100);
    });
    return greeting;
  }
  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `hello ${id}`;
  }
}
