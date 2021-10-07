import {
  DynamicModule,
  Injectable,
  Logger,
  Module,
  NestMiddleware,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class RestLoggingMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void): void {
    const { url, method } = request;

    Logger.log(`[${new Date().toUTCString()}] REQ ${method} ${url}`);
    next();
    Logger.log(
      `[${new Date().toUTCString()}] RES ${
        response.statusCode
      } ${method} ${url}`
    );
  }
}

@Module({})
export class RestLoggingMiddlewareModule {
  static forRoot(): DynamicModule {
    return {
      module: RestLoggingMiddlewareModule,
      providers: [RestLoggingMiddleware],
    };
  }
}
