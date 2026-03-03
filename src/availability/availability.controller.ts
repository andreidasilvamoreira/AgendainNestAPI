import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create.availability.dto';
import { AvailabilityService } from './availability.service';
import { UpdateAvailabilityDto } from './dto/update.availability.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Papel } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO, Papel.CLIENTE)
  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO, Papel.CLIENTE)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.availabilityService.find(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAvailabilityDto) {
    return this.availabilityService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Papel.ADMIN, Papel.FUNCIONARIO)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.availabilityService.delete(id);
  }
}
