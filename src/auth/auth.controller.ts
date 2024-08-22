import { Body, Controller, Get, HttpCode, Post, Req } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { ResponseService } from "src/common/response/response.service";
import { Public } from "src/common/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { LoginResponse, RegisterResponse } from "./response";

@ApiTags("Users")
@Controller("/v1")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @HttpCode(201)
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: RegisterResponse })
  @Public()
  @Post("/auth/register")
  async register(@Body() loginReq: RegisterUserDto) {
    const res = await this.authService.register(loginReq);
    return this.responseService.success(res, 201);
  }

  @HttpCode(200)
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: LoginResponse })
  @Public()
  @Post("/auth/login")
  async login(@Body() loginReq: LoginUserDto) {
    const res = await this.authService.login(loginReq);
    return this.responseService.success(res, 200);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Get("/arsip-negara")
  async secret(@Req() req: any) {
    return { req: JSON.stringify(req?.user) };
  }

  @HttpCode(200)
  @Get("/public")
  @Public()
  async public() {
    return { hello: `world public` };
  }
}
