import { ConflictException } from '@nestjs/common';
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

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((e: NotificationErrorProps): string => e.message).join(', '),
    );
  }
}

export class ConflictDomainException extends ConflictException {
  constructor(message: string) {
    super({
      message,
      error: 'Conflict',
      statusCode: 409,
    });
  }
}
