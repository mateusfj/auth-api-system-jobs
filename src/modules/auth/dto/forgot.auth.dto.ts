import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { inputForgotAuthDTO } from 'src/application/auth/usecase/forgot/forgot.auth.dto';

export class ForgotAuthDto implements inputForgotAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
