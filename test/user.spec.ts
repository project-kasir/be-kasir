import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { WebLoginResponse } from "src/auth/response";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/v1/auth/login (GET)", async () => {
    const result = await request(app.getHttpServer())
      .post("/v1/auth/login")
      .send({
        username: "sigma",
        password: "sigma123",
      });

    expect(result.body).toMatchObject<WebLoginResponse>(new WebLoginResponse());
    expect(result.status).toBe(200);
    expect(result.body.payload).toHaveProperty("token");
    console.log(result);
  });
});
