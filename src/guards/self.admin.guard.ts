import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log('req', req.admin);

    console.log('req.admin ', req.admin);
    console.log('req.params.id  ', req.params.id);
    console.log('req.admin.id  ', req.params.id);

    if (String(req.admin.id) != req.params.id) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan foydalanuvchi',
      });
    }

    if (req.admin.is_active === false || req.admin.is_creator == true) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan admin oxirgi req.admin.isctivate ishladi ga tuwdi`',
      });
    }
    return true;
  }
}
