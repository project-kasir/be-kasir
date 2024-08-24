import { ApiProperty } from "@nestjs/swagger";


export class RegisterResponse  {
  @ApiProperty({ type: String })
  token!: string;
}

export class LoginResponse extends RegisterResponse {}
