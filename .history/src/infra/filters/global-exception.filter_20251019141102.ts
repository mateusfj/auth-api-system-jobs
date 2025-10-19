import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotificationError } from 'src/domain/@shared/exceptions/domain.exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string[] = [];

    if (exception instanceof NotificationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      details = exception.errors.map(
        (error) => `${error.context}: ${error.message}`,
      );
    }
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(details.length > 0 && { details }),
    };

    response.status(status).json(errorResponse);
  }
}
