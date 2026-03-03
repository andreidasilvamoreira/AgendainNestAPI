import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAvailabilityDto } from './dto/update.availability.dto';
import { CreateAvailabilityDto } from './dto/create.availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  private assertTime(time: string) {
    const ok = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
    if (!ok) throw new BadRequestException('Hora inválida (use HH:mm)');
  }

  private async assertNoOverlap(params: { funcionario_id: number; dia_semana: number; inicio: string; fim: string; ignoreId?: number }) {
    const conflito = await this.prisma.disponibilidade.findFirst({
      where: {
        funcionario_id: params.funcionario_id,
        dia_semana: params.dia_semana,
        ativo: true,
        ...(params.ignoreId ? { id: { not: params.ignoreId } } : {}),
        AND: [{ inicio: { lt: params.fim } }, { fim: { gt: params.inicio } }],
      },
    });

    if (conflito) {
      throw new BadRequestException('Já existe uma disponibilidade que conflita com esse horário');
    }
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
    if (!item) throw new NotFoundException('Disponibilidade não encontrada');
    return item;
  }

  async create(dto: CreateAvailabilityDto) {
    if (this.timeToMinutes(dto.fim) <= this.timeToMinutes(dto.inicio)) {
      throw new BadRequestException('fim deve ser maior que inicio');
    }

    await this.assertNoOverlap({
      funcionario_id: dto.funcionario_id,
      dia_semana: dto.dia_semana,
      inicio: dto.inicio,
      fim: dto.fim,
    });

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

    const data: Partial<{
      funcionario_id: number;
      dia_semana: number;
      inicio: string;
      fim: string;
      ativo: boolean;
    }> = {};

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

    const funcionarioFinal = data.funcionario_id ?? current.funcionario_id;
    const diaFinal = data.dia_semana ?? current.dia_semana;
    const ativoFinal = data.ativo ?? current.ativo;

    if (ativoFinal) {
      await this.assertNoOverlap({
        funcionario_id: funcionarioFinal,
        dia_semana: diaFinal,
        inicio: inicioFinal,
        fim: fimFinal,
        ignoreId: id,
      });
    }

    return this.prisma.disponibilidade.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.find(id);
    return this.prisma.disponibilidade.delete({ where: { id } });
  }
}
