import { AuthValidator } from '../validator/auth.validator';

export class AuthValidatorFactory {
  static create() {
    return new AuthValidator();
  }
}
