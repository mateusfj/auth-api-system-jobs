import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { InputRefreshTokenAuthDTO } from '../../../core/application/auth/usecase/refresh-token/refresh-token.auth.dto';

export class RefreshTokenAuthDTO implements InputRefreshTokenAuthDTO {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
