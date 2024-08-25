import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { Response } from "express";

@Catch(
  ZodError,
  Prisma.PrismaClientKnownRequestError,
  NotFoundException,
  ForbiddenException,
)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    Logger.error(exception);

    switch (true) {
      case exception instanceof ForbiddenException:
        response.status(403).json({
          errors: "Only admin can perform this action",
          code: 403,
        });
        break;
      case exception instanceof NotFoundException:
        response.status(404).json({
          errors: "Page not found",
          code: 404,
        });
        break;
      case exception instanceof ZodError:
        response.status(400).json({
          errors: exception.errors,
          code: 400,
        });
        break;
      case exception instanceof Prisma.PrismaClientKnownRequestError:
        this.handlePrismaError(exception, response);
        break;
      default:
        response.status(500).json({
          errors: exception.message,
          code: 500,
        });
    }
  }

  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const prismaErrorResponseMap = {
      P2002: {
        errors:
          "There is a unique constraint violation, a new row cannot be created in the database.",
        code: 400,
      },
      P2003: {
        errors:
          "Cannot delete or update a parent row: a foreign key constraint fails.",
        code: 400,
      },
    };

    const errorResponse = prismaErrorResponseMap[exception.code] || {
      code: 500,
    };

    response.status(errorResponse.code).json(errorResponse);
  }
}
