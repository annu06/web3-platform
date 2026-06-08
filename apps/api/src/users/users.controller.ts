import {
  Controller, Get, Put, Param, Body, Query,
  UseGuards, Req,
} from "@nestjs/common";
import { AuthGuard }   from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { Request }      from "express";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("me")
  getMe(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.users.findById(user.id);
  }

  @Get()
  findAll(
    @Query("page")  page  = "1",
    @Query("limit") limit = "20",
  ) {
    return this.users.findAll(+page, +limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.users.findById(id);
  }

  @Put("me/settings")
  updateSettings(@Req() req: Request, @Body() body: Record<string, unknown>) {
    const user = (req as any).user as { id: string };
    return this.users.updateSettings(user.id, body);
  }

  @Get("me/activity")
  activity(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.users.getActivity(user.id);
  }

  @Get("me/notifications")
  notifications(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.users.getNotifications(user.id);
  }

  @Put("me/notifications/read")
  readNotifications(@Req() req: Request) {
    const user = (req as any).user as { id: string };
    return this.users.markNotificationsRead(user.id);
  }
}
