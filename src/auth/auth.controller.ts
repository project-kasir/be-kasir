import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { WebLoginResponse, WebRegisterResponse } from "./response";
import { ResponseService } from "../common/response/response.service";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("Auth")
@Controller("/v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @HttpCode(201)
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: WebRegisterResponse })
  @Public()
  @Post("/register")
  async register(
    @Body() loginReq: RegisterUserDto,
  ): Promise<WebRegisterResponse> {
    const res = await this.authService.register(loginReq);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: WebLoginResponse })
  @Public()
  @Post("/login")
  async login(@Body() loginReq: LoginUserDto): Promise<WebLoginResponse> {
    const res = await this.authService.login(loginReq);
    return this.responseService.success(200, res);
  }
}
