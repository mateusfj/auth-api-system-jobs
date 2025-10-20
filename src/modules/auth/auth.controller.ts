import { Body, Controller, Post } from '@nestjs/common';
import { inputCreateAuthDTO } from 'src/domain/auth/usecase/create/create.auth.dto';
import { CreateAuthUseCase } from 'src/domain/auth/usecase/create/create.auth.usecase';
import type { inputLoginAuthDTO } from 'src/domain/auth/usecase/login/login.auth.dto';
import { LoginAuthUseCase } from 'src/domain/auth/usecase/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/domain/auth/usecase/refresh-token/refresh-token.auth';
import { InputRefreshTokenAuthDTO } from 'src/domain/auth/usecase/refresh-token/refresh-token.auth.dto';
import { CreateAuthDto } from 'src/infra/auth/dto/class-validator/create.auth.dto';
import { LoginAuthDTO } from 'src/infra/auth/dto/class-validator/login.auth.dto';
import { RefreshTokenAuthDTO } from 'src/infra/auth/dto/class-validator/refresh-token.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAuthUseCase: CreateAuthUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateAuthDto) {
    const inputCreateAuthDTO: inputCreateAuthDTO = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    return await this.createAuthUseCase.execute(inputCreateAuthDTO);
  }

  @Post('login')
  async login(@Body() body: LoginAuthDTO) {
    const inputLoginAuthDTO: inputLoginAuthDTO = {
      email: body.email,
      password: body.password,
    };
    return await this.loginAuthUseCase.execute(inputLoginAuthDTO);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenAuthDTO) {
    const input: InputRefreshTokenAuthDTO = { refreshToken: body.refreshToken };
    return await this.refreshTokenUseCase.execute(input);
  }
}
