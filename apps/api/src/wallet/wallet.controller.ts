import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from "@nestjs/common";
import { AuthGuard }     from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { WalletService } from "./wallet.service";
import { Request }       from "express";

@ApiTags("wallet")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("wallet")
export class WalletController {
  constructor(private readonly wallet: WalletService) {}

  @Get("balance/:address")
  balance(@Param("address") address: `0x${string}`) {
    return this.wallet.getBalance(address);
  }

  @Get("ens/:name")
  ens(@Param("name") name: string) {
    return this.wallet.resolveEns(name);
  }

  @Get("my-wallets")
  myWallets(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.wallet.getWalletsByUser(user.id);
  }

  @Post("add")
  add(@Req() req: Request, @Body() body: { address: string; chainId: number }) {
    const user = (req as any).user as { id: string };
    return this.wallet.addWallet(user.id, body.address, body.chainId);
  }

  @Get("transactions")
  transactions(
    @Req() req: Request,
    @Query("page")  page  = "1",
    @Query("limit") limit = "20",
  ) {
    const user = (req as any).user as { id: string };
    return this.wallet.getTransactions(user.id, +page, +limit);
  }
}
