import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  getHello() {
    return 'Hello World!';
  }
}
