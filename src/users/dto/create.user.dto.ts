import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Papel } from '@prisma/client';

export class CreateUserDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome não pode estar vazio' })
  nome: string;

  @IsEmail({}, { message: 'email deve estar no formato válido (ex: nome@dominio.com)' })
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  email: string;

  @IsString({ message: 'senha deve ser uma string' })
  @IsNotEmpty({ message: 'senha não pode estar vazia' })
  @MinLength(6, { message: 'senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsEnum(Papel, { message: 'papel deve ser um valor válido' })
  papel: Papel;
}
