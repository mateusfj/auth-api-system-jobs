import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY_INTERFACE, type AuthInterfaceRespository } from 'src/domain/auth/repository/auth.repository.interface';

@Injectable()
export class AuthService {

  constructor(
    @Inject(AUTH_REPOSITORY_INTERFACE)
    private readonly authRepository: AuthInterfaceRespository
  ) { }

  create(createAuthDto: any) {
    return this.authRepository.create(createAuthDto);
  }

  findAll() {
    return this.authRepository.findAll()
  }

  findOne(id: string) {

  }
}
