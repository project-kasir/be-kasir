import * as winston from "winston";
import { WinstonModule } from "nest-winston";

const GlobalModuleImport = [
  WinstonModule.forRoot({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
    transports: [new winston.transports.Console()],
  }),
];

export default GlobalModuleImport;
