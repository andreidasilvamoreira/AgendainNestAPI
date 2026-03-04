import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [PrismaModule, AppointmentsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
