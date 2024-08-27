import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { Response } from "express";

@Catch(ZodError, Prisma.PrismaClientKnownRequestError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    Logger.error(exception);

    console.log(exception);

    switch (true) {
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
          errors: exception.response.message || "Internal server error",
          code: exception.code || exception.response.statusCode || 500,
        });
    }
  }

  private handlePrismaError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const prismaErrorResponseMap = {
      "42P05": {
        errors: "Internal server error",
        code: 500,
      },
      P2025: {
        errors: "Not found",
        code: 404,
      },
      P2002: {
        errors: "Some field is already exist",
        code: 400,
      },
      P2003: {
        errors: "Relation not found",
        code: 404,
      },
    };

    const errorResponse = prismaErrorResponseMap[exception.code] || {
      errors: "Internal server error",
      code: 500,
    };

    response.status(errorResponse.code).json(errorResponse);
  }
}
