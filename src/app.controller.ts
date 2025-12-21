import { Controller, Get } from '@nestjs/common'; // NestJS decorators
import { AppService } from './app.service'; // Service for business logic

@Controller() // Root controller
export class AppController {
  constructor(
    private readonly appService: AppService // Inject AppService
  ) { }

  @Get() // GET / endpoint
  getHello(): string {
    return this.appService.getHello(); // Return greeting
  }
}
