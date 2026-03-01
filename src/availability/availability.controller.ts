import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create.availability.dto';
import { AvailabilityService } from './availability.service';
import { UpdateAvailabilityDto } from './dto/store.availability.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.availabilityService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    this.availabilityService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAvailabilityDto) {
    return this.availabilityService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.availabilityService.delete(id);
  }
}
