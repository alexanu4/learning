import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ErrorsInterceptor Intercepted');
    return next.handle().pipe(
      catchError((err) => {
        console.log('ErrorsInterceptor error');
        return throwError(() => new BadGatewayException());
      }),
    );
  }
}
