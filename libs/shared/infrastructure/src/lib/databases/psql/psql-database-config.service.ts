import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';
import { DatabaseConfigService } from '../database-config.service';

@Injectable()
export class PsqlDatabaseConfigService implements DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(entities: typeof BaseEntity[]): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'postgres'>('database.type'),
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}
