import {
  Controller, Get, Post, Body, Query, Req,
  UseGuards, HttpCode, HttpStatus,
} from "@nestjs/common";
import { AuthGuard }    from "@nestjs/passport";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService }  from "./auth.service";
import { Request }      from "express";

class SiweVerifyDto {
  message!:   string;
  signature!: string;
}

class RefreshDto {
  refreshToken!: string;
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get("nonce")
  @ApiOperation({ summary: "Generate a SIWE nonce for the given address" })
  nonce(@Query("address") address: string) {
    const nonce = this.auth.generateNonce(address);
    return { nonce };
  }

  @Post("verify")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify a SIWE message and return JWT tokens" })
  verify(@Body() body: SiweVerifyDto) {
    return this.auth.verifySiwe(body.message, body.signature);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Rotate refresh token and return new tokens" })
  refresh(@Body() body: RefreshDto) {
    return this.auth.refresh(body.refreshToken);
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Invalidate the current session" })
  logout(@Req() req: Request) {
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");
    return this.auth.logout(token);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get authenticated user info" })
  me(@Req() req: Request) {
    return (req as any).user;
  }
}
