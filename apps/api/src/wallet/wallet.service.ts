import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";

@Injectable()
export class WalletService {
  private readonly client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.client = createPublicClient({
      chain:     mainnet,
      transport: http(this.config.get("MAINNET_RPC_URL")),
    });
  }

  async getBalance(address: `0x${string}`) {
    const wei = await this.client.getBalance({ address });
    return { address, balance: formatEther(wei), wei: wei.toString() };
  }

  async resolveEns(name: string) {
    const address = await this.client.getEnsAddress({ name });
    return { name, address };
  }

  async getWalletsByUser(userId: string) {
    return this.prisma.wallet.findMany({ where: { userId } });
  }

  async addWallet(userId: string, address: string, chainId: number) {
    return this.prisma.wallet.create({
      data: { userId, address: address.toLowerCase(), chainId, isPrimary: false },
    });
  }

  async getTransactions(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where:   { userId },
        orderBy: { createdAt: "desc" },
        skip, take: limit,
      }),
      this.prisma.transaction.count({ where: { userId } }),
    ]);
    return { data, total, page, limit };
  }
}
