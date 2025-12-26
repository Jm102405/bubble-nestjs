import { Module } from '@nestjs/common'; // NestJS module decorator
import { ClientsService } from './clients.service'; // Client service
import { ClientsController } from './clients.controller'; // Client controller
import { clientsProviders } from './clients.providers'; // Client model providers
import { DatabaseModule } from '../../database/database.module'; // Database module

@Module({
  imports: [DatabaseModule], // Import database connection
  controllers: [ClientsController], // Register controller
  providers: [
    ...clientsProviders,  // Inject client models
    ClientsService, // Register service
  ],
  exports: [ClientsService], // Export service for other modules
})
export class ClientsModule {} // Clients module
