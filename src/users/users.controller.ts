import { Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserResponse } from "./response";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { UserClaims } from "src/common/types";
import { AuthService } from "src/auth/auth.service";
import { ResponseService } from "src/common/response/response.service";

@ApiTags("Users")
@Controller("/v1/users")
export class UsersController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetCurrentUserResponse })
  @Post("/current")
  async current(@CurrentUser() user: UserClaims) {
    const res = await this.authService.getCurrent(user.id);
    return this.responseService.success(200, "Success", res);
  }
}
