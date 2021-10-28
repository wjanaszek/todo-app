import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../api-todo/src/app/app.module';
import { appendGlobalSettingsToNestApp } from '../../../api-todo/src/app/nest-app';

export async function initApplication(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  appendGlobalSettingsToNestApp(app);

  return app.init();
}
