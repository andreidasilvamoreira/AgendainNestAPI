import { Body, Controller, Post} from '@nestjs/common';
import { createAvailabilityDto } from './dto/create.availability.dto';

@Controller('auth')
export class AuthController {
    
    @Post()
    create(@Body() dto: createAvailabilityDto){
        console.log(dto)
        return dto
    }
}
