import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiAuthUiModule } from '@wjanaszek/api-auth/ui';
import { ApiTodoUiModule } from '@wjanaszek/api-todo/ui';
import {
  DatabaseConfigService,
  DatabaseModule,
} from '@wjanaszek/shared/infrastructure';
import configuration from '../../../../config/configuration';

@Module({
  imports: [
    ApiAuthUiModule,
    ApiTodoUiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseModule.forPostgres()],
      useFactory: (config: DatabaseConfigService) => config.getOptions([]),
      inject: [DatabaseConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          transport: config.get<string>('mail.transport'),
          defaults: {
            from: config.get<string>('mail.from'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
