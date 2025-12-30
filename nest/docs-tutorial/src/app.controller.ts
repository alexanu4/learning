import {
  BeforeApplicationShutdown,
  Controller,
  Get,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LazyModuleLoader } from '@nestjs/core';

@Controller()
export class AppController
  implements OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown
{
  constructor(
    private readonly appService: AppService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  onModuleDestroy(signal?: string) {
    console.log('App controller on destroy with signal: ', signal);
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('App controller before shutdown with signal: ', signal);
  }
  onApplicationShutdown(signal?: string) {
    console.log('App controller on shutdown with signal: ', signal);
  }
  @Get()
  async getHello(): Promise<string> {
    const { AuthModule } = await import('./auth/auth.module.js');
    const moduleRef = await this.lazyModuleLoader.load(() => AuthModule);
    const { AuthService } = await import('./auth/auth.service.js');
    const authService = moduleRef.get(AuthService);
    console.log('Lazy loading: ' + authService.doSomething());

    return this.appService.getHello();
  }
}
