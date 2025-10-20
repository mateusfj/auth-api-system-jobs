import { IJwtInterface } from 'src/domain/@shared/jwt/jwt.auth.interface';
import { AuthInterfaceRespository } from '../../repository/auth.repository.interface';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from './refresh-token.auth.dto';

export class RefreshTokenUseCase {
  constructor(
    private readonly authService: AuthInterfaceRespository,
    private readonly jwtService: IJwtInterface,
  ) {}

  // verificar se o token é valido
  // se não for valido, lançar um erro
  // se for valido veificar se o token é do tipo refresh_token
  // se não for refresh_token, lançar um erro
  // se for refresh_token, verificar se o usuario existe
  // se o usuario não existir, lançar um erro
  // gerar um novo access_token e refresh_token

  // implementation redis
  async execute(
    input: InputRefreshTokenAuthDTO,
  ): Promise<OutputRefreshTokenAuthDTO> {
    const payload = await this.jwtService.verify(input.refreshToken);

    console.log('Payload refresh token:', payload);

    if (!payload) {
      throw new Error('Invalid token');
    }

    if (payload.type !== 'refresh_token') {
      throw new Error('Invalid token type');
    }

    const user = await this.authService.findOne(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = await this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    const refreshToken = await this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh_token',
      },
      {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
