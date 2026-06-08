import { Module }         from "@nestjs/common";
import { JwtModule }      from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService }    from "./auth.service";
import { JwtStrategy }    from "./strategies/jwt.strategy";
import { SiweStrategy }   from "./strategies/siwe.strategy";
import { PrismaModule }   from "../prisma/prisma.module";
import { UsersModule }    from "../users/users.module";

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret:      cfg.getOrThrow("JWT_SECRET"),
        signOptions: {
          expiresIn: cfg.get("JWT_EXPIRY", "15m"),
          issuer:    "web3-platform",
          audience:  "web3-platform-api",
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers:   [AuthService, JwtStrategy, SiweStrategy],
  exports:     [AuthService, JwtModule],
})
export class AuthModule {}
