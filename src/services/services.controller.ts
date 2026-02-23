import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto/create.service.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update.service.dto';

@Controller('services')
export class ServicesController {

    constructor(private readonly serviceService: ServicesService){}
    
    @Get()
    findAll(){
        return this.serviceService.findAll()
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number){
        return this.serviceService.find(id)
    }

    @Post()
    create(@Body() dto: CreateServiceDto) {
        this.serviceService.create(dto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto){
        return this.serviceService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number) {
        return this.serviceService.delete(id)
    }
}
