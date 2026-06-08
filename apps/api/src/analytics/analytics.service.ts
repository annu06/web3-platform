import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlatformStats() {
    const [users, nfts, proposals, transactions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.nFT.count(),
      this.prisma.proposal.count(),
      this.prisma.transaction.count(),
    ]);

    const tvl = await this.prisma.stakingPosition.aggregate({ _sum: { amount: true } });

    return {
      totalUsers:        users,
      totalNfts:         nfts,
      totalProposals:    proposals,
      totalTransactions: transactions,
      tvl:               tvl._sum.amount?.toString() ?? "0",
    };
  }

  async getSnapshots(days = 30) {
    return this.prisma.dailySnapshot.findMany({
      orderBy: { date: "desc" },
      take:    days,
    });
  }

  async getVolumeByDay(days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return this.prisma.transaction.groupBy({
      by:     ["createdAt"],
      _sum:   { amount: true },
      _count: { id: true },
      where:  { createdAt: { gte: since }, status: "CONFIRMED" },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async snapshotDaily() {
    const stats = await this.getPlatformStats();

    await this.prisma.dailySnapshot.create({
      data: {
        date:              new Date(),
        tvl:               stats.tvl,
        totalUsers:        stats.totalUsers,
        totalNfts:         stats.totalNfts,
        totalTransactions: stats.totalTransactions,
      },
    });
  }
}
