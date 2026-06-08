import { Module }        from "@nestjs/common";
import { MulterModule }  from "@nestjs/platform-express";
import { NftService }    from "./nft.service";
import { NftController } from "./nft.controller";

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    }),
  ],
  providers:   [NftService],
  controllers: [NftController],
  exports:     [NftService],
})
export class NftModule {}
