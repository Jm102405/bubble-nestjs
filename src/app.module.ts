import { Module } from '@nestjs/common'; // NestJS module decorator
import { ConfigModule } from '@nestjs/config'; // Config module for environment variables

import { AppController } from './app.controller'; // Root controller
import { AppService } from './app.service'; // Root service

import { AuthModule } from './app/auth/auth.module'; // Auth module
import { UsersModule } from './app/users/users.module'; // Users module
import { ClientsModule } from './app/clients/clients.module'; // ✅ Clients module

@Module({
  imports: [
    ConfigModule.forRoot({ // Load .env globally
      isGlobal: true,
    }),
    AuthModule, // Import auth module
    UsersModule, // Import users module
    ClientsModule, // ✅ Import clients module
  ],
  controllers: [AppController], // Register root controller
  providers: [AppService], // Register root service
})
export class AppModule { } // Root application module
