import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.usuario.findMany({
            orderBy: { id: 'desc' },
            select: { id: true, nome: true, email: true, papel: true, criado_em: true, atualizado_em: true}
        })
    }

    async find(id: number) {
        const item = await this.prisma.usuario.findUnique({
             where: { id }, 
             select: { id: true, nome: true, email: true, papel: true, criado_em: true, atualizado_em: true}
            })
        if(!item) { throw new NotFoundException('Usuário não encontrado')}
        return item
    }

    async create(dto: CreateUserDto) {

        const senha_hash = await bcrypt.hash(dto.senha, 10)

        return this.prisma.usuario.create({ 
            data: { nome: dto.nome, email: dto.email, senha_hash, papel: dto.papel},
            select: { id: true, nome: true, email: true, papel: true, criado_em: true, atualizado_em: true}
         })
    }

    async update(id: number, dto: UpdateUserDto) {
        await this.find(id)
        const data: Prisma.UsuarioUpdateInput = {}

        if (dto.nome !== undefined) data.nome = dto.nome;
        if (dto.email !== undefined) data.email = dto.email;
        if (dto.papel !== undefined) data.papel = dto.papel;

        if(dto.senha) {
            data.senha_hash = await bcrypt.hash(dto.senha,10)
        }

        return this.prisma.usuario.update({
            where: { id },
            data,
            select: { id: true, nome: true, email: true, papel: true, criado_em: true, atualizado_em: true}
        })
    }

    async delete(id: number) {
        await this.find(id)
        return this.prisma.usuario.delete({ where: { id }})
    }
}
