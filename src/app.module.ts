import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { SwaggerAssetsModule } from "./swagger-assets/swagger-assets.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    CommonModule,
    AuthModule,
    SwaggerAssetsModule,
    CategoriesModule,
    UsersModule,
  ],
})
export class AppModule {}
