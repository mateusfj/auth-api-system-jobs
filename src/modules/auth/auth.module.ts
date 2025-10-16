import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AUTH_REPOSITORY_INTERFACE } from 'src/domain/auth/repository/auth.repository.interface';

import { AuthModel } from 'src/infra/auth/repository/auth.model';
import { AuthRespository } from 'src/infra/auth/repository/auth.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';



@Module({
  imports: [TypeOrmModule.forFeature([AuthModel])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRespository,
    {
      provide: AUTH_REPOSITORY_INTERFACE,
      useClass: AuthRespository
    }
  ]
})
export class AuthModule { }
