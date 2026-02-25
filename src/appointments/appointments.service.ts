import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment-status.dto';
import { StatusAgendamento } from '@prisma/client';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.agendamento.findMany()
    }

    async find(id: number) {
        const item = await this.prisma.agendamento.findUnique({ where: { id }})
        if(!item) throw new NotFoundException('Agendamento não encontrado')
        return item
    }

    async create(dto: CreateAppointmentDto) {
        const servico = await this.prisma.servico.findUnique({
            where: {id: dto.servico_id}
        })

        if(!servico) throw new NotFoundException('Serviço não encontrado')
        if(!servico.ativo) throw new BadRequestException('Serviço está inativo')

        const [cliente, funcionario] = await Promise.all([

            this.prisma.usuario.findUnique({where: {id: dto.cliente_id}}),
            this.prisma.usuario.findUnique({where: {id: dto.funcionario_id}})
        ])

        if(!cliente) throw new NotFoundException('Cliente não encontrado')
        if(!funcionario) throw new NotFoundException('Funcionario não encontrado')

        const inicio = new Date(dto.inicio_em)

        if(Number.isNaN(inicio.getTime())) {
            throw new BadRequestException('Início inválido')
        }

        const fim = new Date(
            inicio.getTime() + servico.duracao_minutos * 60_000
        )

        const conflito = await this.prisma.agendamento.findFirst({
            where: {
                funcionario_id: dto.funcionario_id,
                status: StatusAgendamento.AGENDADO,
                inicio_em: {lt: fim},
                fim_em: {gt: inicio}
            }
        })

        if(conflito) {
            throw new BadRequestException('Horário indisponível para este funcionário')
        }

        return this.prisma.agendamento.create({
        data: {
            servico_id: dto.servico_id,
            cliente_id: dto.cliente_id,
            funcionario_id: dto.funcionario_id,
            inicio_em: inicio,
            fim_em: fim,
            status: StatusAgendamento.AGENDADO,
            preco_centavos_snapshot: servico.preco_centavos,
            duracao_minutos_snapshot: servico.duracao_minutos,
        },
    });
}

    async update(id: number, dto: UpdateAppointmentDto) {
        await this.find(id)

        return this.prisma.agendamento.update({
            where: { id },
            data: {
                cliente_id: dto.cliente_id,
                funcionario_id: dto.funcionario_id,
                servico_id: dto.servico_id,
                inicio_em: dto.inicio_em ? new Date(dto.inicio_em) : undefined,
                status: dto.status,
            }
        })
    }

    async delete(id: number) {
        await this.find(id)

        return this.prisma.agendamento.delete({
            where: { id }
        })
    }
}
