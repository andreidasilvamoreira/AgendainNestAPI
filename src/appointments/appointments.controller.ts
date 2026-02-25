import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment-status.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Get()
    findAll(){
        return this.appointmentsService.findAll()
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number) {
        return this.appointmentsService.find(id)
    }

    @Post()
    create(@Body() dto: CreateAppointmentDto) {
        return this.appointmentsService.create(dto)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto: UpdateAppointmentDto){
        return this.appointmentsService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.appointmentsService.delete(id)
    }
}
