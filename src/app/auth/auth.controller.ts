import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    console.log('🟢 REGISTER - Received data:', body);

    const { username, email, password, name, role } = body;

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      return { message: 'Email already in use' };
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      username,
      password: hashed,
      email,
      name,
      role: role || 'user',
    });

    console.log('🟢 REGISTER - User created successfully:', newUser.username);

    return {
      message: 'User registered successfully',
      username: newUser.username,
      email: newUser.email,
    };
  }
}
