import { NotificationErrorProps } from '../notification/notification';

export class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
export class NotFoundDomainException extends DomainException {
  constructor(message: string, statusCode = 404) {
    super(message, statusCode);
  }
}

export class ConflictDomainException extends DomainException {
  constructor(message: string, statusCode = 409) {
    super(message, statusCode);
  }
}

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((e: NotificationErrorProps): string => e.message).join(', '),
    );
  }
}
