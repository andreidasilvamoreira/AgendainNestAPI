import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAvailabilityDto } from './dto/store.availability.dto';
import { CreateAvailabilityDto } from './dto/create.availability.dto';

@Injectable()
export class AvailabilityService {
    constructor(private prisma: PrismaService) {}

    private timeStringToDate(time: string): Date {
        const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
        if(!match) throw new BadRequestException('Hora inválida (use HH:mm)')
        const h = Number(match[1]);
        const m = Number(match[2]);

        const d = new Date(0);
        d.setUTCHours(h, m, 0, 0);
        return d;
    }

    async findAll() {
        return this.prisma.disponibilidade.findMany({ orderBy: { id: 'desc' }})
    }

    async find( id: number ) {
        const item = await this.prisma.disponibilidade.findUnique({ where: { id }})
        if (!item) throw new NotFoundException('Disponibilidade não encontrado')
        return item
    }

    async create(dto: CreateAvailabilityDto) {
        return this.prisma.disponibilidade.create({
            data: {
                funcionario_id: dto.funcionario_id,
                dia_semana: dto.dia_semana,
                inicio: this.timeStringToDate(dto.inicio),
                fim: this.timeStringToDate(dto.fim),
                ativo: dto.ativo ?? true
            }
        })
    }

    async update( id: number, dto: UpdateAvailabilityDto ) {
        await this.find(id)

        const data: any = {}

        if (dto.funcionario_id !== undefined) data.funcionario_id = dto.funcionario_id;
        if (dto.dia_semana !== undefined) data.dia_semana = dto.dia_semana
        if (dto.inicio !== undefined) data.inicio = this.timeStringToDate(dto.inicio)
        if (dto.fim !== undefined) data.fim = this.timeStringToDate(dto.fim)
        if (dto.ativo !== undefined) data.ativo = dto.ativo

        return this.prisma.disponibilidade.update({where: {id}, data})
    }

    async delete( id: number ) {
        await this.find(id)
        return this.prisma.disponibilidade.delete({ where: {id} })
    }
}
