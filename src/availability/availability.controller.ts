import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create.availability.dto';
import { AvailabilityService } from './availability.service';
import { UpdateAvailabilityDto } from './dto/store.availability.dto';

@Controller('auth')
export class AvailabilityController {
    
    constructor(private readonly availabilityService: AvailabilityService){}

    @Get()
    findAll(){
        return this.availabilityService.findAll()
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number){
        return this.availabilityService.find(id)
    }

    @Post()
    create(@Body() dto: CreateAvailabilityDto){
        this.availabilityService.create(dto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAvailabilityDto){
        return this.availabilityService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.availabilityService.delete(id)
    }
}
