import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/utils/enums/ERole';
import { inputCreateAuthDTO } from '../../../core/application/auth/usecase/create/create.auth.dto';

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
