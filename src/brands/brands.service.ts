import { Logger } from "winston";
import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../common/prisma/prisma.service";
import { BrandQueryDto, CreateBrandDto, UpdateBrandDto } from "./dto";
import { BrandEntity } from "./entity";
import { WithPagiation } from "../common/types";

@Injectable()
export class BrandsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    const brand = await this.prismaService.brand.create({
      data: createBrandDto,
    });

    this.logger.info(`Brand ${createBrandDto.name} created successfully`);

    return brand;
  }

  async getAll(queryDto: BrandQueryDto): Promise<WithPagiation<BrandEntity[]>> {
    const skip = (queryDto.page - 1) * queryDto.limit;

    const filter: Prisma.BrandWhereInput = {};

    if (queryDto.name) {
      filter.name = {
        search: decodeURI(queryDto.name),
      };
    }

    if (queryDto.supplier_id) {
      filter.supplier_id = queryDto.supplier_id;
    }

    const [payload, total] = await this.prismaService.$transaction([
      this.prismaService.brand.findMany({
        orderBy: {
          created_at: "desc",
        },
        where: filter,
        take: queryDto.limit,
        skip,
      }),
      this.prismaService.brand.count({
        where: filter,
      }),
    ]);

    return {
      payload,
      meta: {
        page: queryDto.page,
        limit: queryDto.limit,
        total_data: total,
        total_page: Math.ceil(total / queryDto.limit),
      },
    };
  }

  async getById(id: string): Promise<BrandEntity> {
    return this.prismaService.brand.findUniqueOrThrow({ where: { id } });
  }

  async update(updateBrandDto: UpdateBrandDto): Promise<BrandEntity> {
    const updatedBrand = await this.prismaService.brand.update({
      where: { id: updateBrandDto.id },
      data: updateBrandDto,
    });

    this.logger.info(`Update Brand: ${updateBrandDto.id}`);

    return updatedBrand;
  }

  async delete(id: string): Promise<string> {
    await this.prismaService.brand.delete({
      where: { id },
    });

    return `Brand with id ${id} has been deleted`;
  }
}
