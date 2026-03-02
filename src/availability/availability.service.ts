import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAvailabilityDto } from './dto/store.availability.dto';
import { CreateAvailabilityDto } from './dto/create.availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  private assertTime(time: string) {
    const ok = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
    if (!ok) throw new BadRequestException('Hora inválida (use HH:mm)');
  }

  private timeToMinutes(time: string) {
    this.assertTime(time);
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  async findAll() {
    return this.prisma.disponibilidade.findMany({ orderBy: { id: 'desc' } });
  }

  async find(id: number) {
    const item = await this.prisma.disponibilidade.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Disponibilidade não encontrado');
    return item;
  }

  async create(dto: CreateAvailabilityDto) {
    this.assertTime(dto.inicio);
    this.assertTime(dto.fim);

    if (this.timeToMinutes(dto.fim) <= this.timeToMinutes(dto.inicio)) {
      throw new BadRequestException('fim deve ser maior que inicio');
    }

    return this.prisma.disponibilidade.create({
      data: {
        funcionario_id: dto.funcionario_id,
        dia_semana: dto.dia_semana,
        inicio: dto.inicio,
        fim: dto.fim,
        ativo: dto.ativo ?? true,
      },
    });
  }

  async update(id: number, dto: UpdateAvailabilityDto) {
    const current = await this.find(id);

    const data: any = {};

    if (dto.funcionario_id !== undefined) data.funcionario_id = dto.funcionario_id;
    if (dto.dia_semana !== undefined) data.dia_semana = dto.dia_semana;

    if (dto.inicio !== undefined) {
      this.assertTime(dto.inicio);
      data.inicio = dto.inicio;
    }

    if (dto.fim !== undefined) {
      this.assertTime(dto.fim);
      data.fim = dto.fim;
    }

    const inicioFinal = data.inicio ?? current.inicio;
    const fimFinal = data.fim ?? current.fim;

    if (this.timeToMinutes(fimFinal) <= this.timeToMinutes(inicioFinal)) {
      throw new BadRequestException('fim deve ser maior que inicio');
    }

    if (dto.ativo !== undefined) data.ativo = dto.ativo;

    return this.prisma.disponibilidade.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.find(id);
    return this.prisma.disponibilidade.delete({ where: { id } });
  }
}
