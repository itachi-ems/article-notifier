import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<MongooseModuleOptions> => ({
    uri:
      configService.get<string>('MONGODB_HOST') +
      configService.get<string>('MONGODB_DB'),
    useNewUrlParser: configService.get<boolean>('USE_NEW_URL_PARSER'),
    retryDelay: configService.get<number>('RETRY_DELAY'),
    retryAttempts: configService.get<number>('RETRY_ATTEMPTS'),
  }),
  inject: [ConfigService],
};
