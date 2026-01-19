import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // ✅ Add this import

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // ✅ Add this line
  ) { }

  // Authenticate user and return JWT token
  async login(loginDto: LoginDto) {
    console.log('🚀 AUTH SERVICE - Login attempt for username:', loginDto.username);
    console.log('🚀 AUTH SERVICE - Login attempt for password:', loginDto.password);
    
    // Find user by username
    const user = await this.usersService.findOneByUsername(loginDto.username);
    console.log('🔥 AUTH SERVICE - User found:', user ? 'YES' : 'NO');

    // Throw error if user doesn't exist
    if (!user) {
      console.log('🔥 AUTH SERVICE - User not found, throwing error');
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('🔑 AUTH SERVICE - Comparing passwords...');
    
    // Compare plaintext password with hashed password from database
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    console.log('🔑 AUTH SERVICE - Password match:', isMatch ? 'YES' : 'NO');

    // Throw error if password doesn't match
    if (!isMatch) {
      console.log('🔥 AUTH SERVICE - Password mismatch, throwing error');
      throw new UnauthorizedException('Invalid username or password');
    }

    // ✅ Create JWT payload with user ID, username, and role
    const payload = { sub: user._id, username: user.username, role: user.role };

    console.log('✅ AUTH SERVICE - Login successful, generating token');

    // Return JWT access token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Register new user and return JWT token
  async register(loginDto: LoginDto) {
    console.log('📝 AUTH SERVICE - Register attempt for username:', loginDto.username);
    
    // Check if username already exists
    const existingUser = await this.usersService.findOneByUsername(loginDto.username);
    
    // Throw error if username is taken
    if (existingUser) {
      console.log('❌ AUTH SERVICE - Username already exists');
      throw new UnauthorizedException('Username already exists');
    }

    console.log('🔒 AUTH SERVICE - Hashing password...');
    
    // ✅ Get salt rounds from .env (defaults to 10 if not set)
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;
    
    // Hash password with bcrypt using salt rounds from .env
    const hashedPassword = await bcrypt.hash(loginDto.password, saltRounds);

    console.log('📝 AUTH SERVICE - Creating user...');
    
    // Save new user to database with hashed password
    const newUser = await this.usersService.create({
      username: loginDto.username,
      password: hashedPassword,
      name: loginDto.username,
      email: '',
      role: 'user'   // default role
    });

    // ✅ Create JWT payload with new user info and role
    const payload = { sub: newUser._id, username: newUser.username, role: newUser.role };

    console.log('✅ AUTH SERVICE - Registration successful');

    // Return JWT access token and success message
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: 'Registration successful',
      username: newUser.username
    };
  }
}
