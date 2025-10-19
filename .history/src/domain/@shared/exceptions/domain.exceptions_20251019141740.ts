import { NotificationErrorProps } from '../notification/notification';

export class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}
export class NotFoundDomainException extends DomainException {}

export class ConflictDomainException extends DomainException {}

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((e: NotificationErrorProps): string => e.message).join(', '),
    );
  }
}
