import { Module } from '@nestjs/common'; // NestJS module decorator
import { JwtModule } from '@nestjs/jwt'; // JWT module
import { ConfigModule, ConfigService } from '@nestjs/config'; // Config utilities

import { Mongoose } from 'mongoose'; // Mongoose type

import { AuthService } from './auth.service'; // Auth logic
import { UsersService } from '../users/users.service'; // User service

import { AuthController } from './auth.controller'; // Auth controller

import { DatabaseModule } from 'src/database/database.module'; // Database module
import { UserSchema } from 'src/database/schemas/users.schema'; // User schema

@Module({
  controllers: [
    AuthController // Register auth controller
  ],
  providers: [
    AuthService, // Auth service provider
    UsersService, // User service provider
    {
      provide: 'USERS_MODEL', // Mongoose user model
      useFactory: (mongoose: Mongoose) => mongoose.model('users', UserSchema),
      inject: ['DATABASE_CONNECTION'], // Inject DB connection
    },
  ],
  imports: [
    ConfigModule, // Config module
    JwtModule.registerAsync({ // JWT configuration
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // JWT secret
        signOptions: { expiresIn: '60s' }, // Token expiry
      }),
    }),
    DatabaseModule, // Database connection
  ]
})
export class AuthModule { } // Auth module
