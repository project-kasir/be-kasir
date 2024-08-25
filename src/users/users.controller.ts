import { Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserResponse } from "./response";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UserClaims } from "../common/types";
import { AuthService } from "../auth/auth.service";
import { ResponseService } from "../common/response/response.service";

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
    return this.responseService.success(200, res);
  }
}
