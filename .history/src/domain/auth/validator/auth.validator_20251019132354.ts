import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/utils/enums/ERole';
import { Notification } from '../../@shared/notification/notification';
import { ClassValidatorFields } from '../../@shared/validator/class-validator-fields';
import { AuthProps } from '../entity/auth.entity';

class AuthRules {
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
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.isActive = props.isActive;
  }
}

export class AuthValidator extends ClassValidatorFields {
  validate(entity: any, notification: Notification): boolean {
    return super.validate(notification, new AuthRules(entity));
  }
}

export class AuthValidatorFactory {
  static create() {
    return new AuthValidator();
  }
}
