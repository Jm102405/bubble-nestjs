import { Injectable, UnauthorizedException } from '@nestjs/common'; // NestJS service and exceptions
import { JwtService } from '@nestjs/jwt'; // JWT service

import * as bcrypt from 'bcrypt'; // Password hashing

import { UsersService } from '../users/users.service'; // User service

import { LoginDto } from './dto/login.dto'; // Login data structure
import { Console } from 'console'; // Console for logging

@Injectable() // Marks class as injectable service
export class AuthService {

  constructor(
    private readonly usersService: UsersService, // Inject user service
    private readonly jwtService: JwtService // Inject JWT service
  ) { }

  async login(loginDto: LoginDto) {
    console.log('🚀 AUTH SERVICE - Login attempt for username:', loginDto.username); // Log username
    console.log('🚀 AUTH SERVICE - Login attempt for password:', loginDto.password); // Log password attempt
    const user = await this.usersService.findOneByUsername(loginDto.username); // Find user
    console.log('🔥 AUTH SERVICE - User found:', user ? 'YES' : 'NO'); // Log if user exists

    if (!user) {
      console.log('🔥 AUTH SERVICE - User not found, throwing error'); // Log error
      throw new UnauthorizedException('Invalid username or password'); // Throw error
    }

    console.log('🔑 AUTH SERVICE - Comparing passwords...'); // Log password check
    const isMatch = loginDto.password === user.password; // Check password
    console.log('🔑 AUTH SERVICE - Password match:', isMatch ? 'YES' : 'NO'); // Log result

    if (!isMatch) {
      console.log('🔥 AUTH SERVICE - Password mismatch, throwing error'); // Log mismatch
      throw new UnauthorizedException('Invalid username or password'); // Throw error
    }

    const payload = { sub: user._id, username: user.username }; // JWT payload

    console.log('✅ AUTH SERVICE - Login successful, generating token'); // Log success

    return {
      access_token: await this.jwtService.signAsync(payload), // Return token
    };
  }

  async register(loginDto: LoginDto) {
    console.log('📝 AUTH SERVICE - Register attempt for username:', loginDto.username); // Log registration attempt
    
    const existingUser = await this.usersService.findOneByUsername(loginDto.username); // Check if user exists
    
    if (existingUser) {
      console.log('❌ AUTH SERVICE - Username already exists'); // Log error
      throw new UnauthorizedException('Username already exists'); // Throw error
    }

    console.log('🔒 AUTH SERVICE - Hashing password...'); // Log hashing
    const hashedPassword = await bcrypt.hash(loginDto.password, 10); // Hash password

    console.log('📝 AUTH SERVICE - Creating user...'); // Log user creation
    const newUser = await this.usersService.create({
      username: loginDto.username,
      password: hashedPassword,
      name: loginDto.username,
      email: '',
      role: 'user' // Default role
    });

    const payload = { sub: newUser._id, username: newUser.username }; // JWT payload

    console.log('✅ AUTH SERVICE - Registration successful'); // Log success

    return {
      access_token: await this.jwtService.signAsync(payload), // Return token
      message: 'Registration successful', // Success message
      username: newUser.username // Return username
    };
  }
}
