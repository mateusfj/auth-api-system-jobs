import { NotFoundDomainException } from 'src/domain/@shared/exceptions/domain.exceptions';
import {
  JwtInterface,
  JwtTokenType,
} from 'src/domain/@shared/jwt/jwt.auth.interface';
import { Auth } from 'src/domain/auth/entity/auth.entity';
import { AuthInterfaceRepository } from 'src/domain/auth/repository/auth.repository.interface';
import { inputForgotAuthDTO, outputForgotAuthDTO } from './forgot.auth.dto';

export class ForgotAuthUseCase {
  constructor(
    private readonly authRepository: AuthInterfaceRepository,
    private readonly jwtService: JwtInterface,
  ) {}
  async execute(input: inputForgotAuthDTO): Promise<outputForgotAuthDTO> {
    const user: Auth = await this.authRepository.findByEmail(input.email);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const resetToken: string = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      type: JwtTokenType.RESET_PASSWORD,
    });

    return { resetToken };
  }
}
