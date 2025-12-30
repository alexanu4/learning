import { Controller, forwardRef, Module } from '@nestjs/common';
import { ErrorsInterceptor } from 'src/interceptor/errors.interceptor';
import { UsersService } from './users.service';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  controllers: [],
  providers: [UsersService],
  imports: [forwardRef(() => CatsModule)],
  exports: [UsersService],
})
export class UsersModule {}
