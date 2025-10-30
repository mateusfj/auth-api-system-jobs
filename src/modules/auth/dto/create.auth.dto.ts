import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/shared/utils/enums/ERole';
import { inputCreateAuthDTO } from '../../../application/auth/usecase/create/create.auth.dto';

export class CreateAuthDto implements inputCreateAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ERole)
  @IsString()
  @IsNotEmpty()
  role: ERole;
}
