import { Test, TestingModule } from '@nestjs/testing'; // NestJS testing utilities
import { UsersService } from './users.service'; // Service to test

describe('UsersService', () => {
  let service: UsersService; // Service instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService], // Provide UsersService
    }).compile();

    service = module.get<UsersService>(UsersService); // Get service instance
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Check service exists
  });
});
