import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationType } from "@prisma/client";

@Injectable()
export class NotifyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId:  string;
    type:    NotificationType;
    title:   string;
    body:    string;
    link?:   string;
    txHash?: string;
  }) {
    return this.prisma.notification.create({ data });
  }

  async createBulk(userIds: string[], type: NotificationType, title: string, body: string) {
    return this.prisma.notification.createMany({
      data: userIds.map(userId => ({ userId, type, title, body })),
    });
  }

  async getUnread(userId: string) {
    return this.prisma.notification.findMany({
      where:   { userId, isRead: false },
      orderBy: { createdAt: "desc" },
      take:    50,
    });
  }

  async markRead(userId: string, ids: string[]) {
    return this.prisma.notification.updateMany({
      where: { userId, id: { in: ids } },
      data:  { isRead: true },
    });
  }

  async notifyNftSale(sellerId: string, buyerId: string, tokenId: string, amount: string) {
    await Promise.all([
      this.create({
        userId: sellerId,
        type:   NotificationType.NFT_SOLD,
        title:  "NFT Sold!",
        body:   `Token #${tokenId} sold for ${amount} ETH`,
      }),
      this.create({
        userId: buyerId,
        type:   NotificationType.NFT_BOUGHT,
        title:  "NFT Purchased",
        body:   `You bought token #${tokenId}`,
      }),
    ]);
  }

  async notifyVoteCast(userId: string, proposalTitle: string) {
    return this.create({
      userId,
      type:  NotificationType.VOTE_CAST,
      title: "Vote Recorded",
      body:  `Your vote on "${proposalTitle}" has been recorded on-chain`,
    });
  }

  async notifyStakeReward(userId: string, amount: string) {
    return this.create({
      userId,
      type:  NotificationType.REWARD_EARNED,
      title: "Staking Reward Earned",
      body:  `You earned ${amount} PLT from staking`,
    });
  }
}
