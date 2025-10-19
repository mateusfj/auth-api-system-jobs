import {
  IJwtInterface,
  JWT_INTERFACE,
} from 'src/core/domain/@shared/jwt/jwt.auth.interface';
import {
  AUTH_REPOSITORY_INTERFACE,
  AuthInterfaceRespository,
} from 'src/core/domain/auth/repository/auth.repository.interface';
import { JwtAuth } from 'src/core/infra/auth/jwt/jwt.auth';
import { AuthRespository } from 'src/core/infra/auth/repository/typeorm/auth.repository';
import { CreateAuthUseCase } from 'src/core/usecase/auth/create/create.auth.usecase';
import { LoginAuthUseCase } from 'src/core/usecase/auth/login/login.auth.usecase';

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
