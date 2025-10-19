import { ERole } from 'src/utils/enums/ERole';
import { Entity } from '../../@shared/entity/entity.abstract';

import { NotificationError } from '../../@shared/exceptions/domain.exceptions';
import { AuthValidatorFactory } from '../validator/auth.validator';

export interface AuthProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: ERole;
  isActive?: boolean;
}

export class Auth extends Entity {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ERole;
  isActive: boolean;

  constructor(props: AuthProps) {
    super();
    this.id = props.id;
    this.role = props.role;
    this.name = props.name;
    this.password = props.password;
    this.email = props.email;
    this.isActive = true;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Auth) {
    const validator = AuthValidatorFactory.create();
    validator.validate(entity, this.notification);
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
