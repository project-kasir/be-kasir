import * as bcrypt from "bcrypt";
import { Logger } from "winston";
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "@prisma/client";

import { PrismaService } from "../common/prisma/prisma.service";
import { ValidationService } from "../common/validation/validation.service";
import { GetCurrentUserResponse } from "../users/response";
import { UsersValidation } from "./zod";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { LoginResponse, RegisterResponse } from "./response";

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly validationService: ValidationService,
  ) {}

  async register(data: RegisterUserDto): Promise<RegisterResponse> {
    const registerUser = this.validationService.validate(
      UsersValidation.RESGISTER,
      data,
    );

    const isUserExist = await this.prismaService.user.findFirst({
      where: {
        username: registerUser.username,
      },
    });

    if (isUserExist) throw new ForbiddenException("User already exist");

    registerUser.password = await bcrypt.hash(
      registerUser.password as string,
      10,
    );

    this.logger.info(`Register User: ${registerUser.username}`);

    const user = await this.prismaService.user.create({
      data: {
        username: registerUser.username as string,
        password: registerUser.password,
        role: UserRole.MEMBER,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return {
      token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async login(data: LoginUserDto): Promise<LoginResponse> {
    const loginUser = this.validationService.validate(
      UsersValidation.LOGIN,
      data,
    );

    const user = await this.prismaService.user.findFirst({
      where: {
        username: loginUser.username,
      },
    });

    if (!user) throw new UnauthorizedException("Username or password wrong");

    const isMatch = await bcrypt.compare(
      loginUser.password as string,
      user.password,
    );

    if (!isMatch) throw new UnauthorizedException("Username or password wrong");

    this.logger.info(`Login User: ${user.username}`);

    return {
      token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async getCurrent(userId: string): Promise<GetCurrentUserResponse | null> {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, role: true },
    });
  }
}
