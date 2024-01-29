import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<img width="100%" src="https://i.ytimg.com/vi/9DmorFYl44M/maxresdefault.jpg"/>';
  }
}
