import { PartialType } from "@nestjs/mapped-types";
import { createAppointmentDto } from "./create-appointment.dto";

export class UpdateAppointmentDto extends PartialType(createAppointmentDto){}