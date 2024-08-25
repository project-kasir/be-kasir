import { ApiProperty } from "@nestjs/swagger";

import { WebSuccessResponse } from "../../common/response/base-response";
import { CategoryDto } from "../dto";

export class CreateCategoryResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String, nullable: true })
  parent_id?: string | null;

  @ApiProperty({ type: String })
  name!: string;
}

export class UpdateCategoryResponse extends CreateCategoryResponse {}

export class WebCreateCategoryResponse extends WebSuccessResponse<CreateCategoryResponse> {
  @ApiProperty({ type: CreateCategoryResponse })
  payload!: CreateCategoryResponse;
}

export class WebUpdateCategoryResponse extends WebSuccessResponse<UpdateCategoryResponse> {
  @ApiProperty({ type: UpdateCategoryResponse })
  payload!: UpdateCategoryResponse;
}

export class WebGetAllCategoriesResponse extends WebSuccessResponse<
  CategoryDto[]
> {
  @ApiProperty({ type: [CategoryDto] })
  payload!: CategoryDto[];
}

export class WebGetCategoryByIdResponse extends WebSuccessResponse<CategoryDto> {
  @ApiProperty({ type: CategoryDto })
  payload!: CategoryDto;
}
