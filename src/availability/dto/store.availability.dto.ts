import { PartialType } from "@nestjs/mapped-types";
import { createAvailabilityDto } from "./create.availability.dto";

export class UpdateAvailabilityDto extends PartialType(createAvailabilityDto){}