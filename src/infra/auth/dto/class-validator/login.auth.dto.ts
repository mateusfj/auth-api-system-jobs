import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { inputLoginAuthDTO } from 'src/domain/auth/usecase/login/login.auth.dto';

export class LoginAuthDTO implements inputLoginAuthDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
