import {ArgumentsHost,Catch,ExceptionFilter,HttpStatus,} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const ERROR_MESSAGES: Record<string, string> = {
  P2002: 'Valor único já existe (ex: email já cadastrado)',
  P2003: 'Chave estrangeira inválida (id relacionado não existe)',
  P2025: 'Registro não encontrado',
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch( exception: Prisma.PrismaClientKnownRequestError,host: ArgumentsHost ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        break;
    }

    response.status(status).json({
      statusCode: status,
      error: ERROR_MESSAGES[exception.code] ?? 'Erro no banco de dados',
      code: exception.code,
    });
  }
}