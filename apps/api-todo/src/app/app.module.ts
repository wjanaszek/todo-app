import { Module } from '@nestjs/common';
import { ApiTodoShellModule } from '@wjanaszek/api-todo/shell';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiTodoShellModule],
  // @TODO remove
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
