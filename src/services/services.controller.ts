import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create.service.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update.service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Papel } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO, Papel.CLIENTE)
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO, Papel.CLIENTE)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.find(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.delete(id);
  }
}
