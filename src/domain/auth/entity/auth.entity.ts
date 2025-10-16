import { EntityValidationError } from "src/domain/@shared/validators/validation.error";
import { ERole } from "src/utils/enums/ERole";
import { v4 as uuid } from "uuid";
import { AuthValidatorFactory } from "../validators/auth.validator";

export interface AuthProps {
  _id?: string;
  _name: string;
  _email: string;
  _password: string;
  _role: ERole;
  _isActive: boolean
}

export class Auth {
  _id?: string;
  _name: string;
  _email: string;
  _password: string;
  _role: ERole;
  _isActive: boolean;

  constructor(props: AuthProps) {
    this._id = props._id ?? uuid();
    this._role = props._role;
    this._name = props._name;
    this._password = props._password;
    this._email = props._email;
    this._isActive = true
  }
  /// metodo statico pois não uso nenhum dado da instancia e sendo assim eu posso usar o metodo sem ter que intanciar o Auth
  static validade(entity: Auth) {
    const validator = AuthValidatorFactory.create()
    const isValid = validator.validate(entity)
    if (!isValid) {
      throw new EntityValidationError(
        validator.errors ?? { invalid: ['Invalid entity'] },
      );
    }
  }

  static create(props: Auth): Auth {
    const entity = new Auth(props)
    Auth.validade(entity)
    return entity
  }

  changePassword(newPassword: string) {
    this._password = newPassword
    Auth.validade(this)
  }

  changeRole(role: ERole) {
    this._role = role
  }

  changeName(name: string) {
    this._name = name
  }

  activate() {
    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }
}
