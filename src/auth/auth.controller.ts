import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { LoginResponse, RegisterResponse } from "./response";
import { ResponseService } from "src/common/response/response.service";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags("Auth")
@Controller("/v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @HttpCode(201)
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: RegisterResponse })
  @Public()
  @Post("/register")
  async register(@Body() loginReq: RegisterUserDto) {
    const res = await this.authService.register(loginReq);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: LoginResponse })
  @Public()
  @Post("/login")
  async login(@Body() loginReq: LoginUserDto) {
    const res = await this.authService.login(loginReq);
    return this.responseService.success(200, res);
  }
}
