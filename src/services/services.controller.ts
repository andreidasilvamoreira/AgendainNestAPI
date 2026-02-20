import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto/create.service.dto';

@Controller('services')
export class ServicesController {

    @Post()
    create(@Body() dto: CreateServiceDto) {
        console.log(dto);
        return dto;
    }
}