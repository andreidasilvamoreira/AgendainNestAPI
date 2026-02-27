import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator"
import { Papel } from "@prisma/client";
export class CreateUserDto {

    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    senha: string;

    @IsEnum(Papel)
    papel: Papel;
}