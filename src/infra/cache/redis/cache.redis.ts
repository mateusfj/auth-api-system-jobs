import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CacheInterface } from 'src/domain/@shared/repository/cache.interface';

export class CacheRedis implements CacheInterface {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Cache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cacheService.get<T>(key);
    return value ?? null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    // log para debug
    console.log('Saving to Redis:', key, value, 3600);

    if (!ttl) {
      await this.cacheService.set(key, value);
      return;
    }

    // TTL deve estar em segundos
    await this.cacheService.set(key, value, { ttl } as any);
  }

  async del(key: string): Promise<void> {
    await this.cacheService.del(key);
  }
}
