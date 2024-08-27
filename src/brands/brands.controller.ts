import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from "@nestjs/swagger";

import { BrandsService } from "./brands.service";
import { Roles } from "../common/decorators/roles.decorator";
import { USER_ROLES } from "../common/types";
import { BrandQueryDto, CreateBrandDto, UpdateBrandDto } from "./dto";
import { ValidationService } from "../common/validation/validation.service";
import { ResponseService } from "../common/response/response.service";
import { BrandValidation } from "./zod";
import {
  WebCreateBrandResponse,
  WebGetAllBrandResponse,
  WebGetBrandByIdResponse,
  WebUpdateBrandResponse,
} from "./response";
import {
  WebBadRequestErrorResponse,
  WebForbiddenErrorResponse,
  WebInternalServerErrorResponse,
  WebNotFoundErrorResponse,
  WebPayloadStringResponse,
  WebUnauthorizedErrorResponse,
} from "../common/response/base-response";

@ApiTags("Brands")
@Controller("/v1/brands")
export class BrandsController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly responseService: ResponseService,
    private readonly brandsService: BrandsService,
  ) {}

  @HttpCode(201)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: CreateBrandDto })
  @ApiOkResponse({ type: WebCreateBrandResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<WebCreateBrandResponse> {
    const createReq = this.validationService.validate(
      BrandValidation.CREATE,
      createBrandDto,
    );
    const res = await this.brandsService.create(createReq);
    return this.responseService.success(201, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiQuery({
    name: "page",
    type: Number,
    example: 1,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    example: 10,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "name",
    type: String,
    required: false,
    allowReserved: true,
  })
  @ApiQuery({
    name: "supplier_id",
    type: String,
    required: false,
    allowReserved: true,
  })
  @ApiOkResponse({ type: WebGetAllBrandResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get()
  async getAll(@Query() query: BrandQueryDto): Promise<WebGetAllBrandResponse> {
    const queryReq = this.validationService.validate(BrandValidation.QUERY, {
      page: +query.page ?? 1,
      limit: +query.limit ?? 10,
      name: query.name,
      supplier_id: query.supplier_id,
    }) as BrandQueryDto;

    const res = await this.brandsService.getAll(queryReq);
    return this.responseService.pagination(200, res.payload, res.meta);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebGetBrandByIdResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Get(":id")
  async getById(@Param("id") id: string): Promise<WebGetBrandByIdResponse> {
    const res = await this.brandsService.getById(id);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiBody({ type: OmitType(UpdateBrandDto, ["id"]) })
  @ApiOkResponse({ type: WebUpdateBrandResponse })
  @ApiBadRequestResponse({ type: WebBadRequestErrorResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<WebUpdateBrandResponse> {
    updateBrandDto.id = id;
    const updateReq = this.validationService.validate(
      BrandValidation.UPDATE,
      updateBrandDto,
    );
    const res = await this.brandsService.update(updateReq);
    return this.responseService.success(200, res);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles([USER_ROLES.ADMIN])
  @ApiOkResponse({ type: WebPayloadStringResponse })
  @ApiUnauthorizedResponse({ type: WebUnauthorizedErrorResponse })
  @ApiForbiddenResponse({ type: WebForbiddenErrorResponse })
  @ApiNotFoundResponse({ type: WebNotFoundErrorResponse })
  @ApiInternalServerErrorResponse({ type: WebInternalServerErrorResponse })
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<WebPayloadStringResponse> {
    const res = await this.brandsService.delete(id);
    return this.responseService.success(200, res);
  }
}
