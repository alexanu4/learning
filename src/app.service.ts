import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HelloService } from './hello.service';

@Injectable()
export class AppService {
  private helloMessage: string;
  constructor(
    private configService: ConfigService,
    private helloService: HelloService,
  ) {
    this.helloMessage = configService.get('HELLO_MESSAGE');
  }
  getHello(): string {
    this.helloService.sayHello('My  name is getHello');
    return this.helloMessage;
  }
}
