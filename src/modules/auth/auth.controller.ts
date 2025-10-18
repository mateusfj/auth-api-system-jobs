import { Body, Controller, Post } from '@nestjs/common';

import type { inputCreateAuthDTO } from 'src/core/usecase/auth/create/create.auth.dto';
import { CreateAuthUseCase } from 'src/core/usecase/auth/create/create.auth.usecase';
import type { inputLoginAuthDTO } from 'src/core/usecase/auth/login/login.auth.dto';
import { LoginAuthUseCase } from 'src/core/usecase/auth/login/login.auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAuthUseCase: CreateAuthUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
  ) {}

  @Post()
  create(@Body() inputCreateAuthDTO: inputCreateAuthDTO) {
    return this.createAuthUseCase.execute(inputCreateAuthDTO);
  }

  @Post('login')
  login(@Body() inputLoginAuthDTO: inputLoginAuthDTO) {
    return this.loginAuthUseCase.execute(inputLoginAuthDTO);
  }
}
