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
import { CreateAuthUseCase } from 'src/domain/auth/usecase/create/create.auth.usecase';
import { LoginAuthUseCase } from 'src/domain/auth/usecase/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/domain/auth/usecase/refresh-token/refresh-token.auth.usecase';
import { AuthRespository } from 'src/infra/auth/repository/typeorm/auth.repository';
import { CacheRedis } from 'src/infra/cache/redis/cache.redis';
import { JwtAuth } from 'src/infra/jwt/jwt.service';

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
];
