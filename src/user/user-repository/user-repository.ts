import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

@Injectable()
export class UserRepository {
  connection: Connection;
  save() {
    console.log(`User saved using ${this.connection.getName()} connection`);
  }
}
export const createUserRepo = (connection: Connection) => {
  const repo = new UserRepository();
  repo.connection = connection;
  return repo;
};
