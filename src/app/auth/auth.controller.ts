import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  async register(@Body() body: any) {
    console.log('🟢 REGISTER - Received data:', body);
    
    const newUser = await this.usersService.create({
      username: body.username,
      password: body.password,
      email: body.email,
      name: body.name,
      role: body.role || 'user'
    });
    
    console.log('🟢 REGISTER - User created successfully:', newUser.username);
    
    return { 
      message: 'User registered successfully', 
      username: newUser.username,
      email: newUser.email 
    };
  }
}
