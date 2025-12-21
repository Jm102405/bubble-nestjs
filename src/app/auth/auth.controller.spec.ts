import { Test, TestingModule } from '@nestjs/testing'; // Testing utilities
import { AuthController } from './auth.controller'; // Controller to test
import { AuthService } from './auth.service'; // Service dependency

describe('AuthController', () => {
  let controller: AuthController; // Controller instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // Register controller
      providers: [AuthService], // Provide service
    }).compile();

    controller = module.get<AuthController>(AuthController); // Get controller
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); // Check if controller exists
  });
});
