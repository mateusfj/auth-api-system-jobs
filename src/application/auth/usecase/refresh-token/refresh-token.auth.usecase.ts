import {
  NotFoundDomainException,
  ValidationDomainException,
} from 'src/domain/@shared/exceptions/domain.exceptions';
import {
  JwtInterface,
  JwtTokenType,
  RefreshTokenPayload,
} from 'src/domain/@shared/jwt/jwt.auth.interface';
import { GenerateTokens } from 'src/domain/@shared/jwt/jwt.generate-tokens';
import { CacheInterface } from 'src/domain/@shared/repository/cache.interface';
import { AuthInterfaceRepository } from 'src/domain/auth/repository/auth.repository.interface';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from './refresh-token.auth.dto';

export class RefreshTokenUseCase {
  constructor(
    private readonly authService: AuthInterfaceRepository,
    private readonly jwtService: JwtInterface,
    private readonly cacheService: CacheInterface,
  ) {}

  async execute(
    input: InputRefreshTokenAuthDTO,
  ): Promise<OutputRefreshTokenAuthDTO> {
    const payload: RefreshTokenPayload = await this.jwtService.verify(
      input.refreshToken,
    );

    if (!payload || payload.type !== JwtTokenType.REFRESH) {
      throw new ValidationDomainException('Invalid token');
    }

    const storedRefreshToken = await this.cacheService.get<string>(
      `refresh_token_${payload.sub}`,
    );

    if (!storedRefreshToken || storedRefreshToken !== input.refreshToken) {
      throw new ValidationDomainException('Invalid token');
    }

    const user = await this.authService.findOne(payload.sub);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const tokenGenerator = new GenerateTokens(this.jwtService, user);
    const tokens = await tokenGenerator.generateTokens();

    await this.cacheService.del(`refresh_token_${user.id}`);

    await this.cacheService.set(
      `refresh_token_${user.id}`,
      tokens.refreshToken,
      parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
    );

    return tokens;
  }
}
