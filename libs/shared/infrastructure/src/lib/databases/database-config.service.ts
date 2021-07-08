import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';

export abstract class DatabaseConfigService {
  abstract getOptions(entities: (typeof BaseEntity)[]): TypeOrmModuleOptions;
}
