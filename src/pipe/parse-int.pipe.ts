import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log(value);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      console.log(val);
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
