export class Connection {
  getName(): string {
    return '';
  }
}

export class MySqlConnection extends Connection {
  getName(): string {
    return 'MySql';
  }
}

export class MongoDbConnection extends Connection {
  getName(): string {
    return 'MongoDB';
  }
}
