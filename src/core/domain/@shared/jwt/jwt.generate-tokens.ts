import { Auth } from 'src/core/domain/auth/entity/auth.entity';
import { JwtInterface, JwtTokenType } from './jwt.auth.interface';

export class GenerateTokens {
  email: string;
  role: string;
  id: string;

  constructor(
    private readonly jwtService: JwtInterface,
    auth: Auth,
  ) {
    this.id = auth.id;
    this.email = auth.email;
    this.role = auth.role;
  }

  async generateTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.jwtService.sign(
      {
        email: this.email,
        role: this.role,
        type: JwtTokenType.ACCESS,
      },
      {
        subject: this.id,
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
      },
    );
    const refreshToken = await this.jwtService.sign(
      {
        email: this.email,
        role: this.role,
        type: JwtTokenType.REFRESH,
      },
      {
        subject: this.id,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );

    return { accessToken, refreshToken };
  }
}
