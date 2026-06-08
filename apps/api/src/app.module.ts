import { Module }          from "@nestjs/common";
import { ConfigModule }    from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule }  from "@nestjs/schedule";
import { PrismaModule }    from "./prisma/prisma.module";
import { AuthModule }      from "./auth/auth.module";
import { UsersModule }     from "./users/users.module";
import { WalletModule }    from "./wallet/wallet.module";
import { NftModule }       from "./nft/nft.module";
import { DefiModule }      from "./defi/defi.module";
import { DaoModule }       from "./dao/dao.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { NotifyModule }    from "./notifications/notify.module";
import { HealthModule }    from "./health/health.module";
import * as Joi            from "joi";

@Module({
  imports: [
    // ── Config ─────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      validationSchema: Joi.object({
        NODE_ENV:          Joi.string().valid("development", "production", "test").default("development"),
        PORT:              Joi.number().default(4000),
        DATABASE_URL:      Joi.string().required(),
        JWT_SECRET:        Joi.string().min(32).required(),
        JWT_EXPIRY:        Joi.string().default("15m"),
        REFRESH_EXPIRY:    Joi.string().default("7d"),
        CORS_ORIGIN:       Joi.string().default("http://localhost:3000"),
        MAINNET_RPC_URL:   Joi.string().uri().optional(),
        REDIS_URL:         Joi.string().optional(),
        OPENAI_API_KEY:    Joi.string().optional(),
        PINATA_API_KEY:    Joi.string().optional(),
        PINATA_SECRET_KEY: Joi.string().optional(),
      }),
    }),

    // ── Rate limiting ───────────────────────────────────────
    ThrottlerModule.forRoot([
      { name: "short",  ttl: 1_000,  limit: 10 },
      { name: "medium", ttl: 60_000, limit: 100 },
      { name: "long",   ttl: 3_600_000, limit: 1000 },
    ]),

    // ── Cron jobs ───────────────────────────────────────────
    ScheduleModule.forRoot(),

    // ── Feature modules ─────────────────────────────────────
    PrismaModule,
    AuthModule,
    UsersModule,
    WalletModule,
    NftModule,
    DefiModule,
    DaoModule,
    AnalyticsModule,
    NotifyModule,
    HealthModule,
  ],
})
export class AppModule {}
