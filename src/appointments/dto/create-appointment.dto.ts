import { IsDateString, IsInt } from "class-validator";

export class CreateAppointmentDto{

    @IsInt()
    servico_id: number;

    @IsInt()
    cliente_id: number;

    @IsInt()
    funcionario_id: number;

    @IsDateString()
    inicio_em: string;
}