import { NotificationErrorProps } from '../notification/notification';

export class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super();
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
    super(
      message,
      this.namespace === 'UnauthorizedDomainException' ? statusCode : 403,
    );
  }
}

export class NotificationError extends DomainException {
  constructor(public errors: NotificationErrorProps[]) {
    super('There are validation errors', 400);
  }
}
