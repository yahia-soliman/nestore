import { JwtService } from '@nestjs/jwt';
import {
  Injectable, CanActivate,
  ExecutionContext, UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    if (!token) {
      throw new UnauthorizedException("log in first");
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.JWTSEC }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['email'] = payload.email;
    } catch {
      throw new UnauthorizedException("log in first");
    }
    return true;
  }
}