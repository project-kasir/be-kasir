import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}
