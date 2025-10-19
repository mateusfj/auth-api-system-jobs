import { Notification } from '../notification/notification';

export interface IValidatorFields {
  validate(notification: Notification, data: any): boolean;
}
