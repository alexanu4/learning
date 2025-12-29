import { forwardRef, Get, Inject, Injectable } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { User } from 'src/decorator/user.decorator';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => CatsService)) private catsService: CatsService,
  ) {}
  @Get()
  findOne(@User('firstname') firstname: string) {
    console.log(`Hello ${firstname}`);
  }
}
