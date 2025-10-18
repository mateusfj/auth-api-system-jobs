import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/utils/enums/ERole';
import { ClassValidatorFields } from '../../@shared/validator/class-validator-fields';
import { Auth, AuthProps } from '../entity/auth.entity';

export class AuthRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: ERole;

  @IsBoolean()
  isActive: boolean;

  constructor(props: AuthProps) {
    this.name = props._name;
    this.email = props._email;
    this.password = props._password;
    this.role = props._role;
    this.isActive = props._isActive;
  }
}

export class AuthValidator extends ClassValidatorFields<AuthRules> {
  validate(entity: Auth): boolean {
    return super.validate(new AuthRules(entity));
  }
}

export class AuthValidatorFactory {
  static create() {
    return new AuthValidator();
  }
}
