import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../injection-tokens/database-connection.injection-token';
import { DatabaseConfigService } from './database-config.service';
import { PsqlDatabaseConfigService } from './psql/psql-database-config.service';

export const PsqlDatabaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: async (configService: ConfigService) =>
    await createConnection({
      type: configService.get('database.type'),
      host: configService.get<string>('database.host'),
      port: configService.get<number>('database.port'),
      username: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.name'),
    }),
  inject: [ConfigService],
};

@Module({
  providers: [PsqlDatabaseProvider],
  exports: [PsqlDatabaseProvider],
})
export class DatabaseModule {
  static forPostgres(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DatabaseConfigService,
          useClass: PsqlDatabaseConfigService,
        },
        PsqlDatabaseProvider,
      ],
      exports: [DatabaseConfigService, PsqlDatabaseProvider],
    };
  }
}
