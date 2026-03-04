import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt({ message: 'O servico_id deve ser um numero inteiro' })
  @Min(1, { message: 'servico_id deve ser maior que 0' })
  servico_id: number;

  @IsInt({ message: 'O cliente_id deve ser um numero inteiro' })
  @Min(1, { message: 'cliente_id deve ser maior que 0' })
  cliente_id: number;

  @IsInt({ message: 'O funcionario_id deve ser um numero inteiro' })
  @Min(1, { message: 'funcionario_id deve ser maior que 0' })
  funcionario_id: number;

  @IsDateString({}, { message: 'inicio_em deve estar no formato certo.' })
  inicio_em: string;
}
