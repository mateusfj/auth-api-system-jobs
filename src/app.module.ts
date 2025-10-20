import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { AppCacheModule } from './modules/cache/cache.module';
import { DatabaseModule } from './modules/database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppCacheModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
