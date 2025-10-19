import { Notification } from './notification';

describe('Unit test for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification();

    const error1 = { message: 'Error 1', context: 'customer' };

    notification.addError(error1);

    expect(notification.messages('customer')).toBe('customer: Error 1, ');

    const error2 = { message: 'Error 2', context: 'customer' };

    notification.addError(error2);

    expect(notification.messages()).toBe(
      'customer: Error 1, customer: Error 2, ',
    );

    const error3 = { message: 'Error 3', context: 'order' };

    notification.addError(error3);

    expect(notification.messages()).toBe(
      'customer: Error 1, customer: Error 2, order: Error 3, ',
    );
  });
});
