import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatchEverythingFilter } from './filter/any-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { CustomValidationPipe } from './pipe/validation.pipe';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from './interceptor/exclude-null.interceptor';
import { ConfigModule } from './config/config.module';
import { HelloService } from './hello.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [CatsModule, ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [
    AppService,
    HttpExceptionFilter,
    CustomValidationPipe,
    TransformInterceptor,
    ExcludeNullInterceptor,
    // {
    //   provide: APP_FILTER,
    //   useClass: CatchEverythingFilter,
    //   scope: Scope.REQUEST,
    //   durable: true,
    // },
    {
      provide: APP_FILTER,
      useExisting: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useExisting: CustomValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useExisting: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useExisting: ExcludeNullInterceptor,
    },
    HelloService,
  ],
})
export class AppModule implements NestModule {
  // constructor(private authService: AuthService) {
  //   // console.log(authService);
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/{*splat}',
      )
      .forRoutes(CatsController);
  }
}
