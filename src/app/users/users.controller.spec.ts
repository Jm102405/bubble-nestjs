import { Test, TestingModule } from '@nestjs/testing'; // NestJS testing utilities
import { UsersController } from './users.controller'; // Controller to test
import { UsersService } from './users.service'; // Service dependency

describe('UsersController', () => {
  let controller: UsersController; // Controller instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController], // Register controller
      providers: [UsersService], // Register service
    }).compile();

    controller = module.get<UsersController>(UsersController); // Get controller instance
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); // Check if controller exists
  });
});
