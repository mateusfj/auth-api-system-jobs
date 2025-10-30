import * as bcrypt from 'bcrypt';
import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { JwtInterface } from 'src/core/domain/@shared/jwt/jwt.auth.interface';
import { GenerateTokens } from 'src/core/domain/@shared/jwt/jwt.generate-tokens';
import { CacheInterface } from 'src/core/domain/@shared/repository/cache.interface';
import { AuthInterfaceRepository } from 'src/core/domain/auth/repository/auth.repository.interface';
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

    const comparedHash = await bcrypt.compare(
      inputLoginAuthDTO.password,
      user.password,
    );

    if (!comparedHash) {
      throw new UnauthorizedDomainException('Invalid credentials');
    }

    const tokenGenerator = new GenerateTokens(this.jwtService, user);
    const tokens = await tokenGenerator.generateTokens();

    await this.cacheService.set(
      `refresh_token_${user.id}`,
      tokens.refreshToken,
    );

    return tokens;
  }
}
