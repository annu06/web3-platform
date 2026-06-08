import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallets:  true,
        settings: true,
      },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findAll(page = 1, limit = 20) {
    const skip  = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip, take: limit,
        orderBy: { createdAt: "desc" },
        include: { wallets: { where: { isPrimary: true } } },
      }),
      this.prisma.user.count(),
    ]);
    return { data, total, page, limit };
  }

  async updateSettings(userId: string, settings: Record<string, unknown>) {
    return this.prisma.userSettings.update({
      where: { userId },
      data:  settings,
    });
  }

  async getActivity(userId: string) {
    return this.prisma.activityFeed.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
      take:    50,
    });
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where:   { userId, isRead: false },
      orderBy: { createdAt: "desc" },
      take:    20,
    });
  }

  async markNotificationsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data:  { isRead: true },
    });
  }
}
