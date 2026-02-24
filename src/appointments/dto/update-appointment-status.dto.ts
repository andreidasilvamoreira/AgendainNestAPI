import { PartialType } from "@nestjs/mapped-types";
import { CreateAppointmentDto } from "./create-appointment.dto";
import { IsEnum } from "class-validator";
import { StatusAgendamento } from "@prisma/client";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto){
    @IsEnum(StatusAgendamento)
    status: StatusAgendamento
}