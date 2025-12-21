import { Test, TestingModule } from '@nestjs/testing'; // NestJS testing utilities
import { AppController } from './app.controller'; // Controller to test
import { AppService } from './app.service'; // Service dependency

describe('AppController', () => {
  let appController: AppController; // Controller instance

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Register controller
      providers: [AppService], // Register service
    }).compile();

    appController = app.get<AppController>(AppController); // Get controller instance
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Test getHello method
    });
  });
});
