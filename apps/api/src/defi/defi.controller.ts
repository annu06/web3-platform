import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthGuard }    from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { DefiService }  from "./defi.service";
import { Request }      from "express";
import { Decimal }      from "@prisma/client/runtime/library";

@ApiTags("defi")
@Controller("defi")
export class DefiController {
  constructor(private readonly defi: DefiService) {}

  @Get("pools")
  pools() {
    return this.defi.getPoolStats();
  }

  @Get("tvl-history")
  tvlHistory() {
    return this.defi.getTvlHistory();
  }

  @Get("my-positions")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  myPositions(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.defi.getUserPositions(user.id);
  }

  @Post("stake")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  stake(@Req() req: Request, @Body() body: { poolId: number; amount: string; txHash: string; chainId: number }) {
    const user = (req as any).user as { id: string };
    return this.defi.recordStake({
      userId:  user.id,
      poolId:  body.poolId,
      amount:  new Decimal(body.amount),
      txHash:  body.txHash,
      chainId: body.chainId,
    });
  }

  @Post("unstake")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  unstake(@Req() req: Request, @Body() body: { poolId: number; amount: string; txHash: string }) {
    const user = (req as any).user as { id: string };
    return this.defi.recordUnstake({
      userId: user.id,
      poolId: body.poolId,
      amount: new Decimal(body.amount),
      txHash: body.txHash,
    });
  }

  @Post("claim")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  claim(@Req() req: Request, @Body() body: { amount: string; txHash: string }) {
    const user = (req as any).user as { id: string };
    return this.defi.recordClaim({
      userId: user.id,
      amount: new Decimal(body.amount),
      txHash: body.txHash,
    });
  }
}
