import { Module, Provider } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModel } from 'src/core/infra/auth/repository/typeorm/auth.model';
import { AuthController } from './auth.controller';
import { PROVIDERS } from './auth.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthModel]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: PROVIDERS as Provider[],
})
export class AuthModule {}
