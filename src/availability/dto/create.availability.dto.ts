import { IsBoolean, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class CreateAvailabilityDto {
  @IsInt()
  funcionario_id: number;

  @IsInt()
  @Min(0)
  @Max(6)
  dia_semana: number;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'inicio deve estar em HH:mm' })
  inicio: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'fim deve estar em HH:mm' })
  fim: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
