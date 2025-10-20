import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          stores: [new KeyvRedis('redis://localhost:6379')],
          ttl: 0,
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
