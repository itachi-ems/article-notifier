import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as myloftLogger from '@eclat-eng/myloft-nodejs-logger';
import { CustomHttpErrorResponse } from '../dto/http-exception-response.dto';

const context = myloftLogger.getRequestContextWithTypes;

@Catch()
export class ErrorHandler implements ExceptionFilter {
  private readonly logger;
  constructor() {
    this.logger = context().logger;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number, message: any;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }
    // Log Error message
    this.logger
      .withError(exception)
      .error(`Exception Caught : ${exception.message}`);

    // Generate Response to be sent
    const dateTime: Date = new Date();
    const errorJson: CustomHttpErrorResponse = {
      path: request.url,
      method: request.method,
      error: message,
      statusCode,
      date: dateTime.toLocaleString(),
      timeStamp: dateTime.getTime(),
    };
    response.status(statusCode).json(errorJson);
  }
}
