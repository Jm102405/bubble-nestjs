import { Document } from 'mongoose'; // Mongoose document type

export interface User extends Document {
  readonly username: string; // Username
  readonly email: string; // Email address
  readonly password: string; // Hashed password
  readonly name?: string; // Optional full name
  readonly createdAt: Date; // Creation timestamp
}
