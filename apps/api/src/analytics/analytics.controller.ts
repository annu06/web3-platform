import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get("stats")
  stats() {
    return this.analytics.getPlatformStats();
  }

  @Get("snapshots")
  snapshots(@Query("days") days = "30") {
    return this.analytics.getSnapshots(+days);
  }

  @Get("volume")
  volume(@Query("days") days = "30") {
    return this.analytics.getVolumeByDay(+days);
  }
}
