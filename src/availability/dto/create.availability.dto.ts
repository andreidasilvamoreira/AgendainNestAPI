import { IsBoolean, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class CreateAvailabilityDto {
  @IsInt({ message: 'funcionario_id deve ser um número inteiro' })
  funcionario_id: number;

  @IsInt({ message: 'dia_semana deve ser um número inteiro' })
  @Min(0, { message: 'dia_semana deve estar entre 0 (domingo) e 6 (sábado)' })
  @Max(6)
  dia_semana: number;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'inicio deve estar no formato HH:mm',
  })
  inicio: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'fim deve estar no formato HH:mm',
  })
  fim: string;

  @IsBoolean({ message: 'ativo deve ser true ou false' })
  @IsOptional()
  ativo?: boolean;
}
