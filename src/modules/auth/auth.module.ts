import { Module, Provider } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModel } from 'src/infrastructure/repository/auth/typeorm/auth.model';
import { AppCacheModule } from 'src/modules/cache/cache.module';
import { AuthController } from './auth.controller';
import { PROVIDERS } from './auth.providers';

@Module({
  imports: [
    AppCacheModule,
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
