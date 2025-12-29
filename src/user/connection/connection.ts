import { ConfigService } from '@nestjs/config';

export class Connection {
  getName(): string {
    return '';
  }
}

export class MySqlConnection extends Connection {
  getName(): string {
    return 'AlexandraDB  ';
  }
}

export class MongoDbConnection extends Connection {
  getName(): string {
    return 'MongoDB';
  }
}

export function getConnection(configService: ConfigService): Connection {
  if (configService.get('DATABASE') === 'alexandradb') {
    return new MySqlConnection();
  } else {
    return new MongoDbConnection();
  }
}
