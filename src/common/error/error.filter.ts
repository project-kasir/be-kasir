import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { Response } from "express";

@Catch(ZodError, Prisma.PrismaClientKnownRequestError, NotFoundException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log(exception);

    switch (true) {
      case exception instanceof NotFoundException:
        response.status(400).json({
          errors: "Not found",
          message: "Page not found",
          status_code: 404,
        });
        break;
      case exception instanceof ZodError:
        response.status(400).json({
          errors: exception,
          message: "Validation error",
          status_code: 400,
        });
        break;
      case exception instanceof Prisma.PrismaClientKnownRequestError:
        this.handlePrismaError(exception, response);
        break;
      default:
        response.status(500).json({
          errors: exception.message,
          message: "Internal server error",
          status_code: 500,
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
        message: "Database error",
        status_code: 400,
      },
      P2003: {
        errors:
          "Cannot delete or update a parent row: a foreign key constraint fails.",
        message: "Database error",
        status_code: 400,
      },
    };

    const errorResponse = prismaErrorResponseMap[exception.code] || {
      message: "Database error",
      status_code: 500,
    };

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}