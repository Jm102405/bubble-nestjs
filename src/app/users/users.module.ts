import { Module } from '@nestjs/common'; // NestJS module decorator
import { UsersService } from './users.service'; // User service
import { UsersController } from './users.controller'; // User controller
import { usersProviders } from './users.providers'; // User model providers
import { DatabaseModule } from '../../database/database.module'; // Database module

@Module({
  imports: [DatabaseModule], // Import database connection
  controllers: [UsersController], // Register controller
  providers: [
    ...usersProviders,  // Inject user models
    UsersService, // Register service
  ],
  exports: [UsersService], // Export service for other modules
})
export class UsersModule {} // Users module
