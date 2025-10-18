import { ERole } from 'src/utils/enums/ERole';
import { EntityValidationError } from '../../@shared/validator/validation.error';
import { AuthValidatorFactory } from '../validator/auth.validator';

export interface AuthProps {
  _id?: string;
  _name: string;
  _email: string;
  _password: string;
  _role: ERole;
  _isActive?: boolean;
}

export class Auth {
  _id: string;
  _name: string;
  _email: string;
  _password: string;
  _role: ERole;
  _isActive: boolean;

  constructor(props: AuthProps) {
    this._id = props._id;
    this._role = props._role;
    this._name = props._name;
    this._password = props._password;
    this._email = props._email;
    this._isActive = true;
  }

  static validade(entity: Auth) {
    const validator = AuthValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(
        validator.errors ?? { invalid: ['Invalid entity'] },
      );
    }
  }

  activate() {
    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }
}
