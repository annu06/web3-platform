import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from "@nestjs/common";
import { AuthGuard }   from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { DaoService }  from "./dao.service";
import { Request }     from "express";
import { ProposalStatus, VoteType } from "@prisma/client";

@ApiTags("dao")
@Controller("dao")
export class DaoController {
  constructor(private readonly dao: DaoService) {}

  @Get("proposals")
  proposals(
    @Query("status") status?: ProposalStatus,
    @Query("page")   page   = "1",
    @Query("limit")  limit  = "20",
  ) {
    return this.dao.getProposals(status, +page, +limit);
  }

  @Get("proposals/:id")
  proposal(@Param("id") id: string) {
    return this.dao.getProposal(id);
  }

  @Post("proposals")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  create(
    @Req() req: Request,
    @Body() body: { title: string; description: string; calldata?: string; targetAddr?: string; onChainId?: string },
  ) {
    const user = (req as any).user as { id: string };
    return this.dao.createProposal(user.id, body);
  }

  @Post("proposals/:id/vote")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  vote(
    @Req() req: Request,
    @Param("id") proposalId: string,
    @Body() body: { support: VoteType; reason?: string; weight?: string },
  ) {
    const user = (req as any).user as { id: string };
    return this.dao.vote(user.id, proposalId, body.support, body.reason, body.weight);
  }

  @Get("my-votes")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  myVotes(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.dao.getUserVotes(user.id);
  }
}
