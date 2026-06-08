import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger }          from "@nestjs/common";
import { SwaggerModule, DocumentBuilder }  from "@nestjs/swagger";
import { ConfigService }                   from "@nestjs/config";
import helmet                              from "helmet";
import compression                         from "compression";
import { AppModule }                       from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app    = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug"],
  });

  const config = app.get(ConfigService);
  const port   = config.get<number>("PORT", 4000);
  const origin = config.get<string>("CORS_ORIGIN", "http://localhost:3000");

  // ── Security ────────────────────────────────────────────────
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        scriptSrc:  ["'self'"],
      },
    },
  }));
  app.use(compression());
  app.enableCors({
    origin:      origin.split(","),
    credentials: true,
    methods:     ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  // ── Global validation ────────────────────────────────────────
  app.useGlobalPipes(new ValidationPipe({
    whitelist:            true,
    transform:            true,
    forbidNonWhitelisted: true,
    transformOptions:     { enableImplicitConversion: true },
  }));

  // ── API prefix ──────────────────────────────────────────────
  app.setGlobalPrefix("api/v1");

  // ── Swagger docs ────────────────────────────────────────────
  if (config.get("NODE_ENV") !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Web3 Platform API")
      .setDescription("Enterprise Web3 Platform REST API — DeFi, NFTs, DAO, Wallet Auth")
      .setVersion("1.0")
      .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "jwt")
      .addTag("auth",         "Authentication & wallet sign-in")
      .addTag("users",        "User profiles & settings")
      .addTag("wallets",      "Wallet management & ENS")
      .addTag("transactions", "On-chain transaction indexing")
      .addTag("nfts",         "NFT minting, marketplace & auctions")
      .addTag("defi",         "Staking, farming, and yield")
      .addTag("dao",          "Proposals, voting, and treasury")
      .addTag("analytics",    "Platform analytics & dashboards")
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`Swagger: http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  logger.log(`🚀 API running on: http://localhost:${port}`);
}

bootstrap();
