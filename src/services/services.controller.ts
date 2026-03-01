import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create.service.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update.service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.delete(id);
  }
}
