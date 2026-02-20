import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.servico.create({
      data
    });
  }
}
