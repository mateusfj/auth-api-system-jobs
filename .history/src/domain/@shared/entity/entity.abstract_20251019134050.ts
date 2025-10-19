import { Notification } from '../notification/notification';

export abstract class Entity {
  public notification: Notification;

  protected constructor() {
    this.notification = new Notification();
  }

  get _id(): string {
    return this.id;
  }
}
