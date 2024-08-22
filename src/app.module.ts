import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { SwaggerAssetsModule } from "./swagger-assets/swagger-assets.module";

@Module({
  imports: [CommonModule, AuthModule, SwaggerAssetsModule],
})
export class AppModule {}
