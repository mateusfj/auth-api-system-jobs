import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { inputResetPasswordAuthDTO } from 'src/application/auth/usecase/reset-password/reset-password.auth.dto';

export class ResetPasswordAuthDTO implements inputResetPasswordAuthDTO {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
