import { ApiProperty } from '@nestjs/swagger'; // Swagger decorator for API docs

export class LoginDto {
    @ApiProperty() // Username field for login
    username: string;

    @ApiProperty() // Password field for login
    password: string;
}
