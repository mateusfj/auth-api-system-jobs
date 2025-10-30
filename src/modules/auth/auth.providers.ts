import { CreateAuthUseCase } from 'src/application/auth/usecase/create/create.auth.usecase';
import { ForgotAuthUseCase } from 'src/application/auth/usecase/forgot/forgot.auth.usecase';
import { LoginAuthUseCase } from 'src/application/auth/usecase/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/application/auth/usecase/refresh-token/refresh-token.auth.usecase';
import { ResetPasswordAuthUseCase } from 'src/application/auth/usecase/reset-password/reset-password.auth.usecase';
import {
  JWT_INTERFACE,
  JwtInterface,
} from 'src/domain/@shared/jwt/jwt.auth.interface';
import {
  CACHE_INTERFACE,
  CacheInterface,
} from 'src/domain/@shared/repository/cache.interface';
import {
  AUTH_REPOSITORY_INTERFACE,
  AuthInterfaceRepository,
} from 'src/domain/auth/repository/auth.repository.interface';

import { JwtAuth } from 'src/infrastructure/providers/auth/jwt/jwt.service';
import { CacheRedis } from 'src/infrastructure/providers/cache/redis/cache.redis';
import { AuthRespository } from 'src/infrastructure/repository/auth/typeorm/auth.repository';

export const PROVIDERS = [
  AuthRespository,
  {
    provide: AUTH_REPOSITORY_INTERFACE,
    useClass: AuthRespository,
  },
  {
    provide: CACHE_INTERFACE,
    useClass: CacheRedis,
  },
  {
    provide: JWT_INTERFACE,
    useClass: JwtAuth,
  },
  {
    provide: CreateAuthUseCase,
    useFactory: (authRepository: AuthInterfaceRepository) => {
      return new CreateAuthUseCase(authRepository);
    },
    inject: [AUTH_REPOSITORY_INTERFACE],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new RefreshTokenUseCase(authRepository, jwtService, cacheService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: LoginAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new LoginAuthUseCase(authRepository, jwtService, cacheService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: ForgotAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
    ) => {
      return new ForgotAuthUseCase(authRepository, jwtService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
  {
    provide: ResetPasswordAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
    ) => {
      return new ResetPasswordAuthUseCase(authRepository, jwtService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
];
