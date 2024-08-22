import * as winston from "winston";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { WinstonModule } from "nest-winston";

import { PrismaService } from "./prisma/prisma.service";
import { ValidationService } from "./validation/validation.service";
import { ResponseService } from "./response/response.service";
import { ErrorFilter } from "./error/error.filter";
import { JwtGuard } from "./guards/jwt.guard";

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.combine(
          winston.format.ms(),
          winston.format.timestamp({
            format: "DD/MM/YYYY dddd HH:mm:ss",
          }),
          winston.format.printf(
            (info) =>
              `${info.timestamp} - [${info.level}] : ${info.message} ${info.ms || ""}`,
          ),
        ),
      ),
      level: "debug",
      transports: [
        new winston.transports.Console({
          format: winston.format.colorize({ all: true }),
        }),
      ],
    }),
  ],
  providers: [
    ValidationService,
    ResponseService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService, ResponseService, PrismaService],
})
export class CommonModule {}
