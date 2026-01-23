export class RegisterDto {
  username: string;
  email: string;
  password: string;
  name: string;
  role?: string;
  profileImage?: string; // ✅ ADD THIS LINE
}
