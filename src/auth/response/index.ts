import { ApiProperty } from "@nestjs/swagger";

import { WebSuccessResponse } from "../../common/response/base-response";

export class RegisterResponse {
  @ApiProperty({ type: String })
  token!: string;
}

export class LoginResponse extends RegisterResponse {}

export class WebRegisterResponse extends WebSuccessResponse<RegisterResponse> {
  @ApiProperty({ type: RegisterResponse })
  payload!: RegisterResponse;
}

export class WebLoginResponse extends WebSuccessResponse<LoginResponse> {
  @ApiProperty({ type: LoginResponse })
  payload!: LoginResponse;
}
