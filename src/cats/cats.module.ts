import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UsersModule } from 'src/users/users.module';

const mockCatsService = {
  findAll() {
    console.log(2);
  },
  findOne() {
    console.log('what');
  },
};

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // {
    //   provide: CatsService,
    //   useValue:mockCatsService,
    // },
    {
      provide: 'AliasCatsService',
      useExisting: CatsService,
    },
  ],
  imports: [forwardRef(() => UsersModule)],
  exports: [CatsService],
})
export class CatsModule {}
