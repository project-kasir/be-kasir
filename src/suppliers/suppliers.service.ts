import { Logger } from "winston";
import { Prisma, Supplier } from "@prisma/client";
import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

import { CreateSupplierDto, SupplierQueryDto, UpdateSupplierDto } from "./dto";
import { PrismaService } from "../common/prisma/prisma.service";
import { WithPagiation } from "../common/types";
import { SupplierEntity } from "./entity";

@Injectable()
export class SuppliersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity> {
    const supplier = await this.prismaService.supplier.create({
      data: createSupplierDto,
    });

    this.logger.info(`Supplier ${createSupplierDto.name} created successfully`);

    return supplier;
  }

  async getAll(
    queryReq: SupplierQueryDto,
  ): Promise<WithPagiation<SupplierEntity[]>> {
    const skip = (queryReq.page - 1) * queryReq.limit;

    const filter: Prisma.SupplierWhereInput = {};

    if (queryReq.name) {
      filter.name = {
        search: decodeURI(queryReq.name),
      };
    }

    const [payload, total] = await this.prismaService.$transaction([
      this.prismaService.supplier.findMany({
        include: {
          brands: {
            select: {
              id: true,
              name: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
        where: filter,
        take: queryReq.limit,
        skip,
      }),
      this.prismaService.supplier.count({
        where: filter,
      }),
    ]);

    return {
      payload,
      meta: {
        page: queryReq.page,
        limit: queryReq.limit,
        total_data: total,
        total_page: Math.ceil(total / queryReq.limit),
      },
    };
  }

  async getById(id: string): Promise<SupplierEntity | null> {
    return this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        brands: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }

  async update(updateSupplierDto: UpdateSupplierDto): Promise<SupplierEntity> {
    const updateData: Partial<Supplier> = {};

    if (updateSupplierDto.name) {
      updateData.name = updateSupplierDto.name;
    }

    if (updateSupplierDto.phone !== undefined) {
      updateData.phone = updateSupplierDto.phone;
    }

    const updatedSupplier = await this.prismaService.supplier.update({
      where: { id: updateSupplierDto.id },
      data: updateData,
    });

    this.logger.info(`Update Supplier: ${updateSupplierDto.id}`);

    return updatedSupplier;
  }

  async delete(id: string): Promise<string> {
    await this.prismaService.supplier.delete({
      where: { id },
    });

    return `Supplier with id ${id} has been deleted`;
  }
}
