import { Controller, Get, Param, Post, Query } from '@nestjs/common';
@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'Post';
  }

  @Get('/auth')
  get(): string {
    return 'get method';
  }

  @Get('/user')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `hello ${firstName} ${lastName}`;
  }
  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `hello ${id}`;
  }
}
