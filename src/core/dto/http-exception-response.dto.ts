export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpErrorResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  date: string;
  timeStamp: number;
}
