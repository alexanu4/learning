import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [/*UsersModule,*/ DiscoveryModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
