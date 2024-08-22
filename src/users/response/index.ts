import { ApiProperty } from "@nestjs/swagger";

export class GetCurrentUserResponse {
  @ApiProperty({ type: "string" })
  id!: string;

  @ApiProperty({ type: "string" })
  username!: string;

  @ApiProperty({ type: "string" })
  role!: string;
}
