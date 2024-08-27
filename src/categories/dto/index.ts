import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ type: String, nullable: true })
  parent_id?: string | null;

  @ApiProperty({ type: String, required: true })
  name!: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ type: String })
  id!: string;
}
