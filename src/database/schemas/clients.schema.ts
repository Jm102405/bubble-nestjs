import { Schema } from 'mongoose';

export const ClientSchema = new Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  barangay: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});
