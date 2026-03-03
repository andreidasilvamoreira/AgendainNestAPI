import { IsString, IsInt, Min, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome não pode estar vazio' })
  nome: string;

  @IsInt({ message: 'duracao_minutos deve ser um número inteiro' })
  @Min(1, { message: 'duracao_minutos deve ser no mínimo 1 minuto' })
  duracao_minutos: number;

  @IsInt({ message: 'preco_centavos deve ser um número inteiro' })
  @Min(0, { message: 'preco_centavos não pode ser negativo' })
  preco_centavos: number;

  @IsBoolean({ message: 'ativo deve ser true ou false' })
  @IsOptional()
  ativo?: boolean;
}
