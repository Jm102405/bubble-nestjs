import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common'; // NestJS decorators and exceptions
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // Swagger decorators

import { AuthGuard } from '../auth/auth.http-guard'; // Auth guard for protected routes

import { UsersService } from './users.service'; // User service

import { CreateUserDto } from './dto/create-user.dto'; // DTO for creating user
import { UpdateUserDto } from './dto/update-user.dto'; // DTO for updating user

@ApiTags('Users') // Swagger group name
@Controller('users') // Users route prefix
export class UsersController {

  constructor(
    private readonly usersService: UsersService // Inject user service
  ) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post() // Create new user
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto); // Call service to create user
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // Internal server error
          message: 'Failed to create user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get() // Get all users
  async findAll() {
    return await this.usersService.findAll(); // Return all users
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id') // Get user by ID
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id); // Find user
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND, // User not found
          message: 'User not found',
          error: `The user with ID ${id} does not exist.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user; // Return found user
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id') // Update user by ID
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.findOne(id); // Find user
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND, // User not found
            message: 'User not found',
            error: `The user with ID ${id} does not exist.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return this.usersService.update(id, updateUserDto); // Update user
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // Update failed
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id') // Delete user by ID
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id); // Find user
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND, // User not found
            message: 'User not found',
            error: `The user with ID ${id} does not exist.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return this.usersService.remove(id); // Remove user
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // Removal failed
          message: 'Failed to remove user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
