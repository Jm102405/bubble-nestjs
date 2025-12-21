import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';
import { Console } from 'console';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    console.log('🚀 AUTH SERVICE - Login attempt for username:', loginDto.username);
    console.log('🚀 AUTH SERVICE - Login attempt for password:', loginDto.password);
    const user = await this.usersService.findOneByUsername(loginDto.username);
    console.log('🔥 AUTH SERVICE - User found:', user ? 'YES' : 'NO');

    if (!user) {
      console.log('🔥 AUTH SERVICE - User not found, throwing error');
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('🔑 AUTH SERVICE - Comparing passwords...');
    const isMatch = loginDto.password === user.password;
    console.log('🔑 AUTH SERVICE - Password match:', isMatch ? 'YES' : 'NO');

    if (!isMatch) {
      console.log('🔥 AUTH SERVICE - Password mismatch, throwing error');
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user._id, username: user.username };

    console.log('✅ AUTH SERVICE - Login successful, generating token');

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(loginDto: LoginDto) {
    console.log('📝 AUTH SERVICE - Register attempt for username:', loginDto.username);
    
    const existingUser = await this.usersService.findOneByUsername(loginDto.username);
    
    if (existingUser) {
      console.log('❌ AUTH SERVICE - Username already exists');
      throw new UnauthorizedException('Username already exists');
    }

    console.log('🔒 AUTH SERVICE - Hashing password...');
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);

    console.log('📝 AUTH SERVICE - Creating user...');
    const newUser = await this.usersService.create({
      username: loginDto.username,
      password: hashedPassword,
      name: loginDto.username,
      email: '',
      role: 'user'
    });

    const payload = { sub: newUser._id, username: newUser.username };

    console.log('✅ AUTH SERVICE - Registration successful');

    return {
      access_token: await this.jwtService.signAsync(payload),
      message: 'Registration successful',
      username: newUser.username
    };
  }
}
