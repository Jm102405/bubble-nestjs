import { Injectable } from '@nestjs/common'; // Marks class as injectable service

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!The api is working properly.'; // Return greeting message
  }
}
