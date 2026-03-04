import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMyAppointmentDto } from './dto/create-my-appointment.dto';
import { StatusAgendamento } from '@prisma/client';

@Injectable()
export class MeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  async me(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criado_em: true,
        atualizado_em: true,
      },
    });

    if (!user) throw new NotFoundException('usuário não encontrado');
    return user;
  }

  async myAppointments(userId: number) {
    return this.prisma.agendamento.findMany({
      where: { cliente_id: userId },
      orderBy: { inicio_em: 'desc' },
      select: {
        id: true,
        inicio_em: true,
        fim_em: true,
        status: true,
        preco_centavos_snapshot: true,
        duracao_minutos_snapshot: true,
        servico: { select: { id: true, nome: true } },
        funcionario: { select: { id: true, nome: true } },
      },
    });
  }

  async createMyAppointment(userId: number, dto: CreateMyAppointmentDto) {
    return await this.appointmentsService.create({
      servico_id: dto.servico_id,
      funcionario_id: dto.funcionario_id,
      cliente_id: userId,
      inicio_em: dto.inicio_em,
    });
  }

  async cancelMyAppointment(userId: number, appointmentId: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id: appointmentId },
      select: { id: true, cliente_id: true, status: true },
    });

    if (!agendamento) throw new NotFoundException('Agendamento não encontrado');

    if (agendamento.cliente_id !== userId) throw new ForbiddenException('Você não pode cancelar este agendamento');

    if (agendamento.status !== StatusAgendamento.AGENDADO) {
      throw new BadRequestException('Só é possível cancelar agendamentos AGENDADOS');
    }

    return this.prisma.agendamento.update({
      where: { id: appointmentId },
      data: { status: StatusAgendamento.CANCELADO },
    });
  }
}
