import { v4 as uuid } from 'uuid';
import { Auth, AuthProps } from '../entity/auth.entity';

export class AuthFactory {
  static create(entity: AuthProps): Auth {
    const auth = new Auth({
      id: uuid(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
    });
    auth.validate(auth);
    return auth;
  }
}
