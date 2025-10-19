import {
  IJwtInterface,
  JWT_INTERFACE,
} from 'src/domain/@shared/jwt/jwt.auth.interface';
import {
  AUTH_REPOSITORY_INTERFACE,
  AuthInterfaceRespository,
} from 'src/domain/auth/repository/auth.repository.interface';
import { CreateAuthUseCase } from 'src/domain/auth/usecase/create/create.auth.usecase';
import { LoginAuthUseCase } from 'src/domain/auth/usecase/login/login.auth.usecase';

import { AuthRespository } from 'src/infra/auth/repository/typeorm/auth.repository';
import { JwtAuth } from 'src/infra/jwt/jwt.auth';

export const PROVIDERS = [
  AuthRespository,
  {
    provide: AUTH_REPOSITORY_INTERFACE,
    useClass: AuthRespository,
  },
  {
    provide: JWT_INTERFACE,
    useClass: JwtAuth,
  },
  {
    provide: CreateAuthUseCase,
    useFactory: (authRepository: AuthInterfaceRespository) => {
      return new CreateAuthUseCase(authRepository);
    },
    inject: [AUTH_REPOSITORY_INTERFACE],
  },
  {
    provide: LoginAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRespository,
      jwtService: IJwtInterface,
    ) => {
      return new LoginAuthUseCase(authRepository, jwtService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
];
