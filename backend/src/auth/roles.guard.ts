import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Papel } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Papel[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.papel) {
      throw new ForbiddenException('Usuário sem permissão');
    }

    if (!roles.includes(user.papel)) {
      throw new ForbiddenException('Acesso negado');
    }

    return true;
  }
}
