import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', async () => {
    const response = await controller.sayHello('sulthan', 'dzaky');
    expect(response).toBe('hello sulthan dzaky');
  });

  it('should be defined', () => {
    const response = httpMock.createResponse();
    controller.hello('sulthan', response);
    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'nestjs app',
      test: 'sulthan',
    });
  });
});
