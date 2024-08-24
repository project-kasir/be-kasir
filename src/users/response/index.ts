import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class GetCurrentUserResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  username!: string;

  @ApiProperty({ type: String })
  role!: UserRole;
}
