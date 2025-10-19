import { validateSync } from 'class-validator';
import { Notification } from '../notification/notification';
import { IValidatorFields } from './validator-fields-interface';

export abstract class ClassValidatorFields implements IValidatorFields {
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
