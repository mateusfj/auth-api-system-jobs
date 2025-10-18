import { FieldsErrors } from './validator-fields-interface';

export class EntityValidationError extends Error {
  constructor(
    public error: FieldsErrors,
    public message = 'Validation Error',
  ) {
    super(message);
  }
}
