import { Module } from '@nestjs/common'; // NestJS module decorator
import { databaseProviders } from './database.providers'; // Database connection providers

@Module({
  providers: [...databaseProviders], // Register database providers
  exports: [...databaseProviders], // Export providers for other modules
})
export class DatabaseModule {} // Database module
