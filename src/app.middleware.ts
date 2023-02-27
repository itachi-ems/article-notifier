import { INestApplication } from '@nestjs/common';
import * as logger from '@eclat-eng/myloft-nodejs-logger';
import myConfig from './config/config';

logger.initialize({
  level: myConfig.logLevel,
});

export function middleware(app: INestApplication): INestApplication {
  // Intiate middleware logger
  const loggerMiddleware = logger.requestMiddleware;

  app.use(
    loggerMiddleware({
      allowedHeaders: myConfig.allowedHeaders,
      requestBodyLimit: myConfig.requestBodyLimit,
      responseBodyLimit: myConfig.responseBodyLimit,
      redactedKeys: myConfig.redactedKeys,
      loggerSkipPaths: myConfig.loggerSkipPaths,
    }),
  );

  return app;
}
