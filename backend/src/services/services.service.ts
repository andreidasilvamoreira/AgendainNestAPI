import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateServiceDto } from './dto/create.service.dto';
import { UpdateServiceDto } from './dto/update.service.dto';

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService) {}

   async find(id: number) {
    const item = await this.prisma.servico.findUnique({ where: { id }})
    if(!item) {throw new NotFoundException('Serviço não encontrado')}
    return item
  }

  async findAll() {
    return this.prisma.servico.findMany({ orderBy: { id: 'desc' }})
  }

  async create(dto: CreateServiceDto) {
    return this.prisma.servico.create({ data: dto });
  }

  async update(id: number, dto: UpdateServiceDto) {
    await this.find(id)
    return this.prisma.servico.update({ where: { id }, data: dto});
  }

  async delete(id: number) {
    await this.find(id)
    return this.prisma.servico.delete({ where: { id }})
  }
}
