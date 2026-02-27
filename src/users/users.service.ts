import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';
import { Prisma } from '@prisma/client';

const userSelect = {
  id: true,
  nome: true,
  email: true,
  papel: true,
  criado_em: true,
  atualizado_em: true,
} satisfies Prisma.UsuarioSelect;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private async hashPassword(senha: string) {
    const saltRounds = Number(process.env.BCRYPT_ROUNDS ?? 10);
    return bcrypt.hash(senha, saltRounds);
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      orderBy: {
        id: 'desc',
      },
      select: userSelect,
    });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUniqueOrThrow({
      where: {
        id,
      },
      select: userSelect,
    });
  }

  async create(dto: CreateUserDto) {
    const email = this.normalizeEmail(dto.email);
    const senha_hash = await this.hashPassword(dto.senha);
    try {
      const papelSeguro = dto.papel;
      return this.prisma.usuario.create({
        data: {
          nome: dto.nome,
          email,
          senha_hash,
          papel: papelSeguro,
        },
        select: userSelect,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw e;
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const data: Prisma.UsuarioUpdateInput = {};

    if (dto.nome !== undefined) data.nome = dto.nome;
    if (dto.email !== undefined) data.email = this.normalizeEmail(dto.email);

    if (dto.papel !== undefined) {
      throw new ForbiddenException('Não é permitido alterar o papel por este endpoint');
    }

    if (dto.senha !== undefined) {
      data.senha_hash = await this.hashPassword(dto.senha);
    }

    try {
      return await this.prisma.usuario.update({
        where: {
          id,
        },
        data,
        select: userSelect,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw e;
    }
  }

  async delete(id: number) {
    await this.prisma.usuario.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email: this.normalizeEmail(email) },
    });
  }
}
