import { PartialType } from "@nestjs/mapped-types";
import { CreateAppointmentDto } from "./create-appointment.dto";
import { IsEnum, IsOptional } from "class-validator";
import { StatusAgendamento } from "@prisma/client";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto){

    @IsOptional()
    @IsEnum(StatusAgendamento)
    status?: StatusAgendamento
}