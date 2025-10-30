import { Body, Controller, Post } from '@nestjs/common';

import { inputCreateAuthDTO } from 'src/core/application/auth/usecase/create/create.auth.dto';
import { CreateAuthUseCase } from 'src/core/application/auth/usecase/create/create.auth.usecase';
import {
  inputForgotAuthDTO,
  outputForgotAuthDTO,
} from 'src/core/application/auth/usecase/forgot/forgot.auth.dto';
import { ForgotAuthUseCase } from 'src/core/application/auth/usecase/forgot/forgot.auth.usecase';
import {
  inputLoginAuthDTO,
  outputLoginAuthDTO,
} from 'src/core/application/auth/usecase/login/login.auth.dto';
import { LoginAuthUseCase } from 'src/core/application/auth/usecase/login/login.auth.usecase';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from 'src/core/application/auth/usecase/refresh-token/refresh-token.auth.dto';
import { RefreshTokenUseCase } from 'src/core/application/auth/usecase/refresh-token/refresh-token.auth.usecase';
import {
  inputResetPasswordAuthDTO,
  outputResetPasswordAuthDTO,
} from 'src/core/application/auth/usecase/reset-password/reset-password.auth.dto';
import { ResetPasswordAuthUseCase } from 'src/core/application/auth/usecase/reset-password/reset-password.auth.usecase';
import { CreateAuthDto } from 'src/modules/auth/dto/create.auth.dto';
import { LoginAuthDTO } from 'src/modules/auth/dto/login.auth.dto';
import { RefreshTokenAuthDTO } from 'src/modules/auth/dto/refresh-token.auth.dto';
import { ForgotAuthDto } from './dto/forgot.auth.dto';
import { ResetPasswordAuthDTO } from './dto/reset-password.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAuthUseCase: CreateAuthUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotAuthUseCase: ForgotAuthUseCase,
    private readonly resetPasswordAuthUseCase: ResetPasswordAuthUseCase,
  ) {}

  @Post('register')
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
  async login(@Body() body: LoginAuthDTO): Promise<outputLoginAuthDTO> {
    const inputLoginAuthDTO: inputLoginAuthDTO = {
      email: body.email,
      password: body.password,
    };
    return await this.loginAuthUseCase.execute(inputLoginAuthDTO);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenAuthDTO,
  ): Promise<OutputRefreshTokenAuthDTO> {
    const inputRefreshToken: InputRefreshTokenAuthDTO = {
      refreshToken: body.refreshToken,
    };
    return await this.refreshTokenUseCase.execute(inputRefreshToken);
  }

  @Post('forgot')
  async forgot(@Body() body: ForgotAuthDto): Promise<outputForgotAuthDTO> {
    const inputForgot: inputForgotAuthDTO = { email: body.email };
    return await this.forgotAuthUseCase.execute(inputForgot);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordAuthDTO,
  ): Promise<outputResetPasswordAuthDTO> {
    const inputResetPassword: inputResetPasswordAuthDTO = {
      resetToken: body.resetToken,
      newPassword: body.newPassword,
    };
    return await this.resetPasswordAuthUseCase.execute(inputResetPassword);
  }
}
