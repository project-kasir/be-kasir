import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { Category } from "@prisma/client";

import { CategoriesService } from "./categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from "@nestjs/swagger";
import { ResponseService } from "../common/response/response.service";
import { Roles } from "../common/decorators/roles.decorator";
import { USER_ROLES } from "../common/types";
import { ValidationService } from "../common/validation/validation.service";
import { CategoryValidation } from "./zod";
import { Public } from "../common/decorators/public.decorator";
import { WebSuccessResponse } from "../common/response/base-response";
import { CreateCategoryResponse, UpdateCategoryResponse } from "./response";

@ApiTags("Categories")
@Controller("/v1/categories")
export class CategoriesController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly responseService: ResponseService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @HttpCode(201)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ type: WebSuccessResponse<CreateCategoryResponse> })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<WebSuccessResponse<CreateCategoryResponse>> {
    this.validationService.validate(
      CategoryValidation.CREATE,
      createCategoryDto,
    );
    const res = await this.categoriesService.create(createCategoryDto);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @Public()
  @ApiOkResponse({ type: WebSuccessResponse<Category[]> })
  @Get()
  async getAll(): Promise<WebSuccessResponse<Category[]>> {
    const res = await this.categoriesService.getAll();
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @Public()
  @ApiOkResponse({ type: WebSuccessResponse<Category> })
  @Get(":id")
  async getById(
    @Param("id") id: string,
  ): Promise<WebSuccessResponse<Category>> {
    const res = await this.categoriesService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateCategoryDto, ["id"]) })
  @ApiOkResponse({ type: WebSuccessResponse<UpdateCategoryResponse> })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    updateCategoryDto.id = id;
    this.validationService.validate(
      CategoryValidation.UPDATE,
      updateCategoryDto,
    );
    const res = await this.categoriesService.update(updateCategoryDto);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebSuccessResponse<string> })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    const res = await this.categoriesService.delete(id);
    return this.responseService.success(200, res);
  }
}
