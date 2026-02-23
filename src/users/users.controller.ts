import { Body, Controller, Post, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number){
        return this.usersService.find(id)
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto){
        return this.usersService.update(id, dto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}
