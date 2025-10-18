import { Body, Controller, Post } from '@nestjs/common';

import { inputCreateAuthDTO } from 'src/core/usecase/auth/create/create.auth.dto';
import { CreateAuthUseCase } from 'src/core/usecase/auth/create/create.auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly createAuthUseCase: CreateAuthUseCase) {}

  @Post()
  create(@Body() inputCreateAuthDTO: inputCreateAuthDTO) {
    return this.createAuthUseCase.execute(inputCreateAuthDTO);
  }
}
