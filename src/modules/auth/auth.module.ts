import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AUTH_REPOSITORY_INTERFACE } from 'src/core/domain/auth/repository/auth.repository.interface';

import { AuthRespository } from 'src/core/infra/auth/repository/typeorm/auth.repository';
import { CreateAuthUseCase } from 'src/core/usecase/auth/create/create.auth.usecase';

import { AuthModel } from 'src/core/infra/auth/repository/typeorm/auth.model';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthModel])],
  controllers: [AuthController],
  providers: [
    AuthRespository,
    CreateAuthUseCase,
    {
      provide: AUTH_REPOSITORY_INTERFACE,
      useClass: AuthRespository,
    },
  ],
})
export class AuthModule {}
