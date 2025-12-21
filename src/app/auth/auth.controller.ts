import { Controller, Post, Body } from '@nestjs/common'; // NestJS decorators
import { ApiTags } from '@nestjs/swagger'; // Swagger tag for grouping endpoints

import { AuthService } from './auth.service'; // Authentication service
import { UsersService } from '../users/users.service'; // User service

import { LoginDto } from './dto/login.dto'; // Login data structure

@ApiTags('Auth') // Swagger group name
@Controller('api/auth') // Auth route prefix
export class AuthController {

  constructor(
    private readonly authService: AuthService, // Handles login logic
    private readonly usersService: UsersService // Handles user creation
  ) { }

  @Post("login") // Login endpoint
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto); // Authenticate user
  }

  @Post("register") // Register endpoint
  async register(@Body() body: any) {
    console.log('🟢 REGISTER - Received data:', body); // Log request data
    
    const newUser = await this.usersService.create({
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
      role: body.role || 'user' // Default role
    });
    
    console.log('🟢 REGISTER - User created successfully:', newUser.username); // Log success
    
    return { 
      message: 'User registered successfully', // Success message
      username: newUser.username,
      email: newUser.email 
    };
  }
}
