import { Notification } from '../notification/notification';

export interface IValidatorInterface {
  validate(notification: Notification, data: any): boolean;
}
