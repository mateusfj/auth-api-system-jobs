import { v4 as uuid } from 'uuid';
import { Auth, AuthProps } from '../entity/auth.entity';

export class AuthFactory {
  static create(entity: AuthProps): Auth {
    const auth = new Auth({
      _id: uuid(),
      _name: entity._name,
      _email: entity._email,
      _password: entity._password,
      _role: entity._role,
    });
    Auth.validade(auth);
    return auth;
  }
}
