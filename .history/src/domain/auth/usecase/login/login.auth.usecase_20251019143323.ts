import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/domain/@shared/exceptions/domain.exceptions';
import { IJwtInterface } from 'src/domain/@shared/jwt/jwt.auth.interface';
import { AuthInterfaceRespository } from '../../repository/auth.repository.interface';
import { inputLoginAuthDTO, outputLoginAuthDTO } from './login.auth.dto';

export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthInterfaceRespository,
    private readonly jwtService: IJwtInterface,
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

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const tokenGenerator = new GeneterateTokens(this.jwtService);
    const token = await tokenGenerator.generateAccessToken(payload);
    const refreshToken = await tokenGenerator.generateRefreshToken(payload);

    return {
      token,
      refreshToken,
    };
  }
}

class GeneterateTokens {
  constructor(private readonly jwtService: IJwtInterface) {}

  async generateAccessToken(payload: object): Promise<string> {
    return this.jwtService.sign(
      {
        ...payload,
        type: 'access_token',
      },
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
      },
    );
  }

  async generateRefreshToken(payload: object): Promise<string> {
    return this.jwtService.sign(
      {
        ...payload,
        type: 'refresh_token',
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );
  }
}
