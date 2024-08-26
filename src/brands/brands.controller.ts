import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { BrandsService } from "./brands.service";
import { Roles } from "../common/decorators/roles.decorator";
import { USER_ROLES } from "../common/types";
import { CreateBrandDto } from "./dto";
import { ValidationService } from "../common/validation/validation.service";
import { ResponseService } from "../common/response/response.service";
import { BrandValidation } from "./zod";
import { WebCreateBrandResponse } from "./response";
import {
  WebForbiddenErrorResponse,
  WebInternalServerErrorResponse,
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
    this.validationService.validate(BrandValidation.CREATE, createBrandDto);
    const res = await this.brandsService.create(createBrandDto);
    return this.responseService.success(201, res);
  }

  // @Get()
  // findAll() {
  //   return this.brandsService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.brandsService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateBrandDto: UpdateBrandDto) {
  //   return this.brandsService.update(+id, updateBrandDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.brandsService.remove(+id);
  // }
}
