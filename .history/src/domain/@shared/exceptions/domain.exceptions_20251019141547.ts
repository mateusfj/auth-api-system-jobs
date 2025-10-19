import { BadRequestException } from '@nestjs/common';
import { NotificationErrorProps } from '../notification/notification';

export class DomainException extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'DomainException';
  }
}
export class ConflictDomainException extends DomainException {}

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((e: NotificationErrorProps): string => e.message).join(', '),
    );
  }
}

export class ValidationException extends BadRequestException {
  constructor(message: string | string[]) {
    super({
      message: 'Validation failed',
      error: 'Bad Request',
      statusCode: 400,
      details: Array.isArray(message) ? message : [message],
    });
  }
}
