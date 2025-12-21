import { ApiProperty } from '@nestjs/swagger'; // Swagger decorator for API docs

export class CreateUserDto {
  @ApiProperty() // User's full name
  name: string;

  @ApiProperty() // User's email address
  email: string;

  @ApiProperty() // Username for login
  username: string;

  @ApiProperty() // User password
  password: string;

  @ApiProperty() // User role (e.g., admin, user)
  role: string;
}
