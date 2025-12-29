import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { CacheKey } from 'src/decorator/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cacheKey = this.reflector.get(CacheKey, context.getHandler());

    if (cacheKey) {
      const cachedValue = this.getFromCache(cacheKey);

      if (cachedValue) {
        return of(cachedValue);
      }
    }
    return next.handle();
  }
  private getFromCache(key: string) {
    //TO-DO: real cache logic
    if (key === 'allCats') {
      return [{ name: 'Whiskers', age: 2, breed: 'British Blue' }];
    }
    return null;
  }
}
