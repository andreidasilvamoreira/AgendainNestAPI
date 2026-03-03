import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Papel } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.find(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.delete(id);
  }
}
