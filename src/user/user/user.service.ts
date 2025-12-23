import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(nama: string): string {
    return `hello ${nama}`;
  }
}
