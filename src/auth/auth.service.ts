import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Papel } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async Register(dto: RegisterDto) {
    return this.userService.create({ nome: dto.nome, email: dto.email, senha: dto.senha, papel: Papel.CLIENTE });
  }

  async Login(email: string, senha: string) {
    const user = await this.userService.findByEmail(email);
    if (!email) throw new UnauthorizedException('Credenciais Inválidas');

    if (!user?.senha_hash) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const ok = await bcrypt.compare(senha, user.senha_hash);
    if (!ok) throw new UnauthorizedException('Credenciais Inválidas');

    const payload = { sub: user?.id, email: user?.email, papel: user?.papel };

    const acess_token = await this.jwt.signAsync(payload);
    return { acess_token };
  }
}
