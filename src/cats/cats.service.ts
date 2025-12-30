import {
  BeforeApplicationShutdown,
  forwardRef,
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  Scope,
} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { UsersService } from 'src/users/users.service';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor() {
    // @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    // private lazyModuleLoader: LazyModuleLoader,
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }
}
