import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class DefiService {
  constructor(private readonly prisma: PrismaService) {}

  async getPoolStats() {
    const positions = await this.prisma.stakingPosition.groupBy({
      by:     ["poolId"],
      _sum:   { amount: true },
      _count: { id: true },
    });
    return positions;
  }

  async getUserPositions(userId: string) {
    return this.prisma.stakingPosition.findMany({
      where:   { userId },
      orderBy: { stakedAt: "desc" },
    });
  }

  async recordStake(data: {
    userId:  string;
    poolId:  number;
    amount:  Decimal;
    txHash:  string;
    chainId: number;
  }) {
    const existing = await this.prisma.stakingPosition.findFirst({
      where: { userId: data.userId, poolId: data.poolId },
    });

    if (existing) {
      return this.prisma.stakingPosition.update({
        where: { id: existing.id },
        data:  { amount: { increment: data.amount } },
      });
    }

    return this.prisma.stakingPosition.create({ data });
  }

  async recordUnstake(data: {
    userId:  string;
    poolId:  number;
    amount:  Decimal;
    txHash:  string;
  }) {
    const position = await this.prisma.stakingPosition.findFirst({
      where: { userId: data.userId, poolId: data.poolId },
    });

    if (!position) return null;

    const newAmount = (position.amount as Decimal).minus(data.amount);

    if (newAmount.lte(0)) {
      return this.prisma.stakingPosition.delete({ where: { id: position.id } });
    }

    return this.prisma.stakingPosition.update({
      where: { id: position.id },
      data:  { amount: newAmount },
    });
  }

  async recordClaim(data: {
    userId:  string;
    amount:  Decimal;
    txHash:  string;
  }) {
    await this.prisma.stakingPosition.updateMany({
      where: { userId: data.userId },
      data:  { totalClaimed: { increment: data.amount } },
    });
    return { claimed: data.amount };
  }

  async getTvlHistory() {
    return this.prisma.dailySnapshot.findMany({
      orderBy: { date: "desc" },
      take:    90,
      select:  { date: true, tvl: true, stakingApr: true },
    });
  }
}
