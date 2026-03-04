import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Papel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { MeService } from './me.service';
import { CreateMyAppointmentDto } from './dto/create-my-appointment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Papel.CLIENTE)
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  me(@Req() req: any) {
    return this.meService.me(req.user.id);
  }

  @Get('appointments')
  myAppointments(@Req() req: any) {
    return this.meService.myAppointments(req.user.id);
  }

  @Post('appointments')
  createMyAppointment(@Req() req: any, @Body() dto: CreateMyAppointmentDto) {
    return this.meService.createMyAppointment(req.user.id, dto);
  }

  @Patch('appointments/:id/cancel')
  cancel(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.meService.cancelMyAppointment(req.user.id, id);
  }
}
