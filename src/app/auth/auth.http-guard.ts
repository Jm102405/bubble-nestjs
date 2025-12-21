import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'; // NestJS guard utilities
import { JwtService } from '@nestjs/jwt'; // JWT handling
import { Request } from 'express'; // Express request type

@Injectable() // Marks class as injectable service
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService // JWT service for verification
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // Get HTTP request

    const token = this.extractTokenFromHeader(request); // Extract JWT from headers
    if (!token) {
      throw new UnauthorizedException(); // Reject if no token
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET // Verify using secret
        }
      );

      request['user'] = payload; // Attach payload to request
    } catch {
      throw new UnauthorizedException(); // Reject if verification fails
    }

    return true; // Allow access if valid
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // Split "Bearer <token>"
    return type === 'Bearer' ? token : undefined; // Return token if Bearer
  }
}
