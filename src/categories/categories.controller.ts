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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from "@nestjs/swagger";

import { CategoriesService } from "./categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { ResponseService } from "../common/response/response.service";
import { Roles } from "../common/decorators/roles.decorator";
import { USER_ROLES } from "../common/types";
import { ValidationService } from "../common/validation/validation.service";
import { CategoryValidation } from "./zod";
import {
  WebBadRequestErrorResponse,
  WebForbiddenErrorResponse,
  WebInternalServerErrorResponse,
  WebNotFoundErrorResponse,
  WebPayloadStringResponse,
  WebUnauthorizedErrorResponse,
} from "../common/response/base-response";
import {
  WebCreateCategoryResponse,
  WebGetAllCategoryResponse,
  WebGetCategoryByIdResponse,
  WebGetCategoryNestedResponse,
  WebUpdateCategoryResponse,
} from "./response";

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
  @ApiOkResponse({ type: WebCreateCategoryResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<WebCreateCategoryResponse> {
    const createReq = this.validationService.validate(
      CategoryValidation.CREATE,
      createCategoryDto,
    );
    const res = await this.categoriesService.create(createReq);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebGetAllCategoryResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get()
  async getAll(): Promise<WebGetAllCategoryResponse> {
    const res = await this.categoriesService.getAll();
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebGetCategoryNestedResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get("/nested")
  async getNested(): Promise<WebGetCategoryNestedResponse> {
    const res = await this.categoriesService.getNested();
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebGetCategoryByIdResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get(":id")
  async getById(@Param("id") id: string): Promise<WebGetCategoryByIdResponse> {
    const res = await this.categoriesService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateCategoryDto, ["id"]) })
  @ApiOkResponse({ type: WebUpdateCategoryResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<WebUpdateCategoryResponse> {
    updateCategoryDto.id = id;
    const updateReq = this.validationService.validate(
      CategoryValidation.UPDATE,
      updateCategoryDto,
    );
    const res = await this.categoriesService.update(updateReq);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebPayloadStringResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    const res = await this.categoriesService.delete(id);
    return this.responseService.success(200, res);
  }
}
