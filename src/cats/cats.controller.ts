import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  OnModuleDestroy,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { createCatSchema } from './dto/zod-create-cat.dto';
import type { ZodCreateCatDto } from './dto/zod-create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CustomForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { ZodValidationPipe } from 'src/pipe/zod-validation.pipe';
import { CustomValidationPipe } from 'src/pipe/validation.pipe';
import { CreateCatDto } from './dto/create-cat.dto';
import { CustomParseIntPipe } from 'src/pipe/parse-int.pipe';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { ErrorsInterceptor } from 'src/interceptor/errors.interceptor';
import { CacheKey } from 'src/decorator/cache.decorator';
import { CacheInterceptor } from 'src/interceptor/cache.interceptor';
import { TimeoutInterceptor } from 'src/interceptor/timeout.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController implements OnModuleDestroy {
  constructor(private catsService: CatsService) {}

  onModuleDestroy() {
    console.log('Cats controller on destroy');
  }

  //with zod pipeline
  // @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: ZodCreateCatDto) {
  //   // throw new CustomForbiddenException();
  //   this.catsService.create(createCatDto);
  // }

  //with class validator pipeline
  @Post()
  // @Roles(['admin'])
  @UseInterceptors(ErrorsInterceptor)
  async create(@Body(new CustomValidationPipe()) createCatDto: CreateCatDto) {
    // throw new CustomForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  // @CacheKey('allCats')
  @UseInterceptors(CacheInterceptor, TimeoutInterceptor)
  async findAll(): Promise<Cat[]> {
    try {
      return await this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new DefaultValuePipe(1), CustomParseIntPipe) id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
