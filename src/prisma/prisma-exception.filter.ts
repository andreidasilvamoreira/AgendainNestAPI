import { ArgumentsHost, ExceptionFilter, Catch, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client"

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro no banco de dados'

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT

        const field = (exception.meta?.target as string[])?.[0];
        message = field
        ? `${field} já está em uso`
        : 'valor único já existe';
        
        break;
      }

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Relacionamento inválido (registro não encontrado)'
        break;
      

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Registro não encontrado'
        break
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}