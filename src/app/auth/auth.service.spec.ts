import { Test, TestingModule } from '@nestjs/testing'; // NestJS testing utilities
import { AuthService } from './auth.service'; // Service to test

describe('AuthService', () => {
  let service: AuthService; // Auth service instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService], // Provide AuthService
    }).compile();

    service = module.get<AuthService>(AuthService); // Get service instance
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Check service exists
  });
});
