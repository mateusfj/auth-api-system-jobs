import { ERole } from 'src/utils/enums/ERole';

export class inputCreateAuthDTO {
  name: string;
  email: string;
  password: string;
  role: ERole;
}

export class outputCreateAuthDTO {
  id: string;
  name: string;
  email: string;
  role: ERole;
  isActive: boolean;
}
