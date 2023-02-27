import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as myloftLogger from '@eclat-eng/myloft-nodejs-logger';
import { middleware } from './app.middleware';
import myConfig from './config/config';

// Generate logger context
const context = myloftLogger.getRequestContextWithTypes;
const logger = context().logger;

async function bootstrap() {
  const PORT = myConfig.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Express middleware
  middleware(app);
  await app.listen(
    PORT,
    logger.info(`Server running on: http://localhost:${PORT}`),
  );
}

(async (): Promise<void> => {
  try {
    await bootstrap();
  } catch (error) {
    logger.withError(error).error(`Exception Caught : ${error.message}`);
  }
})();
