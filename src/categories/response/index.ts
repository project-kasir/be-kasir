import { ApiProperty } from "@nestjs/swagger";

import { WebSuccessResponse } from "../../common/response/base-response";
import { CategoryEntity, CategoryNestedEntity } from "../entity";

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

export class WebGetAllCategoryResponse extends WebSuccessResponse<
  CategoryEntity[]
> {
  @ApiProperty({ type: [CategoryEntity] })
  payload!: CategoryEntity[];
}

export class WebGetCategoryNestedResponse extends WebSuccessResponse<
  CategoryNestedEntity[]
> {
  @ApiProperty({ type: [CategoryNestedEntity] })
  payload!: CategoryNestedEntity[];
}

export class WebGetCategoryByIdResponse extends WebSuccessResponse<CategoryEntity> {
  @ApiProperty({ type: CategoryEntity })
  payload!: CategoryEntity;
}
