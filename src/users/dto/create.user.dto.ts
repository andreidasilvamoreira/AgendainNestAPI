import { IsEmail, IsEnum, IsString, MinLength } from "class-validator"
import { Papel } from "@prisma/client";
export class CreateUserDto {

    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    senha: string;

    @IsEnum(Papel)
    papel: Papel;
}