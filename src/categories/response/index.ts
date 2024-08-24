import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String, nullable: true })
  parent_id?: string | null;

  @ApiProperty({ type: String })
  name!: string;
}

export class UpdateCategoryResponse extends CreateCategoryResponse {}
