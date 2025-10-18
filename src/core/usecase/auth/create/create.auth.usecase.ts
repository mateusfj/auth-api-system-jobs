import { Inject, Injectable } from '@nestjs/common';
import { AuthFactory } from 'src/core/domain/auth/factory/AuthFactory';
import type { AuthInterfaceRespository } from 'src/core/domain/auth/repository/auth.repository.interface';
import { AUTH_REPOSITORY_INTERFACE } from 'src/core/domain/auth/repository/auth.repository.interface';
import { inputCreateAuthDTO, outputCreateAuthDTO } from './create.auth.dto';

@Injectable()
export class CreateAuthUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY_INTERFACE)
    private readonly authRepository: AuthInterfaceRespository,
  ) {}

  async execute(data: inputCreateAuthDTO): Promise<outputCreateAuthDTO> {
    const auth = AuthFactory.create({
      _name: data.name,
      _email: data.email,
      _password: data.password,
      _role: data.role,
    });

    await this.authRepository.create(auth);

    return {
      id: auth._id,
      name: auth._name,
      email: auth._email,
      role: auth._role,
      isActive: auth._isActive,
    };
  }
}
