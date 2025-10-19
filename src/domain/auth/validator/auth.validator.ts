import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

  @IsEnum(ERole)
  @IsNotEmpty()
  role: ERole;

  constructor(props: AuthProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }
}

export class AuthValidator extends ClassValidatorFields {
  validate(entity: any, notification: Notification): boolean {
    return super.validate(notification, new AuthRules(entity));
  }
}
