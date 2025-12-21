import { PartialType } from '@nestjs/mapped-types'; // Makes all fields optional
import { CreateUserDto } from './create-user.dto'; // Base DTO for user creation

export class UpdateUserDto extends PartialType(CreateUserDto) { } // DTO for updating user
