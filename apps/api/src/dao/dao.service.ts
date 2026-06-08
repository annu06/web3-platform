import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProposalStatus, VoteType } from "@prisma/client";

@Injectable()
export class DaoService {
  constructor(private readonly prisma: PrismaService) {}

  async getProposals(status?: ProposalStatus, page = 1, limit = 20) {
    const skip  = (page - 1) * limit;
    const where = status ? { status } : {};
    const [data, total] = await Promise.all([
      this.prisma.proposal.findMany({
        where, skip, take: limit,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { votes: true } } },
      }),
      this.prisma.proposal.count({ where }),
    ]);
    return { data, total, page, limit };
  }

  async getProposal(id: string) {
    const p = await this.prisma.proposal.findUnique({
      where:   { id },
      include: {
        votes: {
          orderBy: { createdAt: "desc" },
          take:    100,
          include: { user: { select: { id: true } } },
        },
      },
    });
    if (!p) throw new NotFoundException("Proposal not found");
    return p;
  }

  async createProposal(userId: string, data: {
    title:       string;
    description: string;
    calldata?:   string;
    targetAddr?: string;
    onChainId?:  string;
  }) {
    return this.prisma.proposal.create({
      data: {
        ...data,
        proposerId: userId,
        status:     ProposalStatus.PENDING,
      },
    });
  }

  async vote(userId: string, proposalId: string, support: VoteType, reason?: string, weight?: string) {
    const existing = await this.prisma.vote.findUnique({
      where: { proposalId_userId: { proposalId, userId } },
    });
    if (existing) throw new ConflictException("Already voted on this proposal");

    return this.prisma.vote.create({
      data: { userId, proposalId, support, reason, weight },
    });
  }

  async getUserVotes(userId: string) {
    return this.prisma.vote.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
      include: { proposal: { select: { id: true, title: true, status: true } } },
    });
  }

  async syncProposalStatus(onChainId: string, status: ProposalStatus) {
    return this.prisma.proposal.update({
      where: { onChainId },
      data:  { status },
    });
  }
}
