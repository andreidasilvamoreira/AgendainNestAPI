import { IsString, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateServiceDto {
    
    @IsString()
    nome: string;

    @IsInt()
    @Min(1)
    duracao_minutos: number;

    @IsInt()
    @Min(0)
    preco_centavos: number;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}