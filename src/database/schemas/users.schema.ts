import { Schema } from 'mongoose'; // Mongoose schema

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Hashed password
  name: { type: String }, // Optional full name
  createdAt: { type: Date, default: Date.now }, // Timestamp
});
