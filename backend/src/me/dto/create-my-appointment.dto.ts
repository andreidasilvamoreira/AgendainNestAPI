import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateMyAppointmentDto {
  @IsInt({ message: 'servico_id deve ser um numero inteiro' })
  @Min(1, { message: 'servico_id deve ser maior que 0' })
  servico_id: number;

  @IsInt({ message: 'funcionario_id deve ser um numero inteiro' })
  @Min(1, { message: 'funcionario_id deve ser maior que 0' })
  funcionario_id: number;

  @IsDateString({}, { message: 'inicio_em deve estar no formato certo.' })
  inicio_em: string;
}
