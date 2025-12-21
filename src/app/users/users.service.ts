import { Injectable, Inject } from '@nestjs/common'; // NestJS decorators
import { Model } from 'mongoose'; // Mongoose model type
import { User } from './entities/user.entity'; // User interface
import { CreateUserDto } from './dto/create-user.dto'; // DTO for creating user
import { UpdateUserDto } from './dto/update-user.dto'; // DTO for updating user

@Injectable() // Marks class as injectable service
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly userModel: Model<User>, // Inject User model
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto); // Create new user instance
    return createdUser.save(); // Save to DB
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Return all users
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec(); // Find user by ID
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec(); // Find user by email
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec(); // Find user by username
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec(); // Update user and return new doc
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec(); // Delete user by ID
  }
}
