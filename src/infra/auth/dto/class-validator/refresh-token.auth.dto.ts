import { IsNotEmpty, IsString } from 'class-validator';
import { InputRefreshTokenAuthDTO } from 'src/domain/auth/usecase/refresh-token/refresh-token.auth.dto';

export class RefreshTokenAuthDTO implements InputRefreshTokenAuthDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
