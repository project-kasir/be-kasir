import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ type: String, required: true })
  username!: string;

  @ApiProperty({ type: String, required: true })
  password!: string;
}

export class RegisterUserDto extends LoginUserDto {}
