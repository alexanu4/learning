import { Reflector } from '@nestjs/core';

export const CacheKey = Reflector.createDecorator<string>();
