import { Body, Controller, Post } from '@nestjs/common';
import { createAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {

    @Post()
    create(@Body() dto: createAppointmentDto) {
        console.log(dto)
        return dto
    }
}
