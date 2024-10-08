import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(`Unuathorized  user`);
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(`Invalid authorization`);
    }

    async function verify(token: string, jwtService: JwtService) {
      let user: any;
      try {
        const user = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        if (!user) {
          throw new UnauthorizedException(`Unuathorized  user`);
        }
        if (!user.is_active) {
          throw new UnauthorizedException(`User is not active`);
        }
        req.user = user;
        return true;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    return verify(token, this.jwtService);
  }
}
