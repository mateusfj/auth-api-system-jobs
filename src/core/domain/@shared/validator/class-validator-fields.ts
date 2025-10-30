import { validateSync } from 'class-validator';
import { Notification } from '../notification/notification';
import { IValidatorInterface } from './validator.interface';

export abstract class ClassValidatorFields implements IValidatorInterface {
  validate(notification: Notification, data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      for (const error of errors) {
        Object.values(error.constraints).forEach((message) => {
          notification.addError({
            message,
            context: data.constructor.name,
          });
        });
      }
      return false;
    }
    return true;
  }
}
