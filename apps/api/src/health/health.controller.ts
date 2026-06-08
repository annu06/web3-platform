import { Controller, Get } from "@nestjs/common";
import { ApiTags }         from "@nestjs/swagger";
import { PrismaService }   from "../prisma/prisma.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    let dbOk = false;
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbOk = true;
    } catch {}

    return {
      status:    dbOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      db:        dbOk ? "connected" : "unreachable",
      version:   process.env.npm_package_version ?? "1.0.0",
    };
  }
}
