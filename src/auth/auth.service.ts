import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as myloftLogger from '@eclat-eng/myloft-nodejs-logger';
import { Test, TestDocument } from './schema/test-database.schema';
import { SuccessDto } from './dto/test-database.dto';

const context = myloftLogger.getRequestContextWithTypes;

@Injectable()
export class AuthService {
  private logger;

  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<TestDocument>,
  ) {
    this.logger = context().logger;
  }

  // GET /api/auth/ping - Check database connection
  async checkConnection(): Promise<SuccessDto> {
    try {
      // Check database connection
      this.logger.info('Checking database connection...');

      await this.testModel.find();
      this.logger.info('Database connection Established Successfully...');
      return { success: true };
    } catch (error) {
      this.logger.withError(error).error(`Exception Caught : ${error.message}`);
    }
  }
}
