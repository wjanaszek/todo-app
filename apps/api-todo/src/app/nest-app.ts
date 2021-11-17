import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export const globalRoutePrefix = 'api';

export function appendGlobalSettingsToNestApp(app: INestApplication): void {
  setupPrefix(app);
  setupPipes(app);
  setupSwagger(app);
}

function setupPrefix(app: INestApplication): void {
  app.setGlobalPrefix(globalRoutePrefix);
}

function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
}

function setupSwagger(app: INestApplication): void {
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);
}
