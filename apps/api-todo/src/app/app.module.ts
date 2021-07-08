import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTodo } from '@wjanaszek/api-todo/shell';
import { ApiTodoUiModule } from '@wjanaszek/api-todo/ui';
import { DatabaseConfigService, DatabaseModule } from '@wjanaszek/shared/infrastructure';
import configuration from '../../../../config/configuration';

@Module({
  imports: [
    ApiTodoUiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseModule.forPostgres()],
      useFactory: (config: DatabaseConfigService) =>
        config.getOptions(ApiTodo.entities),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class AppModule {}
