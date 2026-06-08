import {
  Injectable, UnauthorizedException, ConflictException, BadRequestException
} from "@nestjs/common";
import { JwtService }     from "@nestjs/jwt";
import { ConfigService }  from "@nestjs/config";
import { PrismaService }  from "../prisma/prisma.service";
import { ethers }         from "ethers";
import { SiweMessage }    from "siwe";
import * as crypto        from "crypto";

@Injectable()
export class AuthService {
  private readonly nonces = new Map<string, { nonce: string; expiresAt: number }>();

  constructor(
    private readonly prisma:  PrismaService,
    private readonly jwt:     JwtService,
    private readonly config:  ConfigService,
  ) {}

  // ── SIWE (Sign-In With Ethereum) ──────────────────────────────

  generateNonce(address: string): string {
    const nonce = crypto.randomBytes(16).toString("hex");
    this.nonces.set(address.toLowerCase(), {
      nonce,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
    });
    return nonce;
  }

  async verifySiwe(message: string, signature: string) {
    const siweMsg = new SiweMessage(message);
    const result  = await siweMsg.verify({ signature });

    if (!result.success) {
      throw new UnauthorizedException("Invalid SIWE signature");
    }

    const stored = this.nonces.get(siweMsg.address.toLowerCase());
    if (!stored || stored.nonce !== siweMsg.nonce || Date.now() > stored.expiresAt) {
      throw new UnauthorizedException("Invalid or expired nonce");
    }

    this.nonces.delete(siweMsg.address.toLowerCase());

    // Upsert user + wallet
    let wallet = await this.prisma.wallet.findUnique({
      where: { address: siweMsg.address.toLowerCase() },
      include: { user: true },
    });

    if (!wallet) {
      const user = await this.prisma.user.create({
        data: {
          wallets: {
            create: {
              address:   siweMsg.address.toLowerCase(),
              chainId:   siweMsg.chainId ?? 1,
              isPrimary: true,
            },
          },
          settings: { create: {} },
        },
        include: { wallets: true },
      });
      wallet = user.wallets[0] as any;
      wallet!.user = user as any;
    }

    return this.issueTokens(wallet!.user);
  }

  // ── JWT issuance ─────────────────────────────────────────────

  async issueTokens(user: { id: string; role: string }) {
    const payload = { sub: user.id, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload),
      this.jwt.signAsync(payload, {
        expiresIn: this.config.get("REFRESH_EXPIRY", "7d"),
      }),
    ]);

    // Persist refresh token (hash it)
    await this.prisma.session.create({
      data: {
        token:        crypto.createHash("sha256").update(accessToken).digest("hex"),
        refreshToken: crypto.createHash("sha256").update(refreshToken).digest("hex"),
        expiresAt:    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId:       user.id,
      },
    });

    return { accessToken, refreshToken };
  }

  async refresh(rawRefreshToken: string) {
    let payload: any;
    try {
      payload = this.jwt.verify(rawRefreshToken, {
        secret: this.config.getOrThrow("JWT_SECRET"),
      });
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const hash = crypto.createHash("sha256").update(rawRefreshToken).digest("hex");
    const session = await this.prisma.session.findUnique({
      where: { refreshToken: hash },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException("Session expired");
    }

    await this.prisma.session.delete({ where: { refreshToken: hash } });

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    return this.issueTokens(user);
  }

  async logout(accessToken: string) {
    const hash = crypto.createHash("sha256").update(accessToken).digest("hex");
    await this.prisma.session.deleteMany({ where: { token: hash } });
  }
}
