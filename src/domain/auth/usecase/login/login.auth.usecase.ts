import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/domain/@shared/exceptions/domain.exceptions';
import { JwtInterface } from 'src/domain/@shared/jwt/jwt.auth.interface';
import { GenerateTokens } from 'src/domain/@shared/jwt/jwt.generate-tokens';
import { CacheInterface } from 'src/domain/@shared/repository/cache.interface';
import { AuthInterfaceRepository } from '../../repository/auth.repository.interface';
import { inputLoginAuthDTO, outputLoginAuthDTO } from './login.auth.dto';

export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthInterfaceRepository,
    private readonly jwtService: JwtInterface,
    private readonly cacheService: CacheInterface,
  ) {}

  async execute(
    inputLoginAuthDTO: inputLoginAuthDTO,
  ): Promise<outputLoginAuthDTO> {
    const user = await this.authRepository.findByEmail(inputLoginAuthDTO.email);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    if (user.password !== inputLoginAuthDTO.password) {
      throw new UnauthorizedDomainException('Invalid credentials');
    }

    const tokenGenerator = new GenerateTokens(this.jwtService, user);
    const tokens = await tokenGenerator.generateTokens();

    await this.cacheService.set(
      `refresh_token_${user.id}`,
      tokens.refreshToken,
    );

    await this.cacheService.get(`refresh_token_${user.id}`);

    return tokens;
  }
}
