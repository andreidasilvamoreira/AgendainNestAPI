import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Campo Obrigatorio' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha inválida' })
  @MinLength(6, { message: 'senha deve ter no mínimo 6 caracteres' })
  senha: string;
}
