import { NotificationErrorProps } from '../notification/notification';

export class DomainException {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    this.message = message;
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

export class UnauthorizedDomainException extends DomainException {
  constructor(message: string, statusCode = 401) {
    super(message, statusCode);
  }
}

export class NotificationError extends DomainException {
  constructor(public errors: NotificationErrorProps[]) {
    super('Validation failed', 400);
    this.errors = errors;
  }
}
