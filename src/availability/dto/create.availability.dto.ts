import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateAvailabilityDto {

    @IsInt()
    funcionario_id: number;

    @IsInt()
    @Min(0)
    @Max(6)
    dia_semana: number;

    @IsString()
    inicio: string;

    @IsString()
    fim: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean;
}