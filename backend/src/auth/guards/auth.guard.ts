/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization as string;
    if (!authorization) throw new UnauthorizedException();
    const token = authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync(token);
      request.user = await this.jwtService.decode(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
