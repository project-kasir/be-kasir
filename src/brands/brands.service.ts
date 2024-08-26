import { Logger } from "winston";
import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateBrandDto, UpdateBrandDto } from "./dto";
import { BrandEntity } from "./entity";

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

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
