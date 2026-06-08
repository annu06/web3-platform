import { Module }        from "@nestjs/common";
import { MulterModule }  from "@nestjs/platform-express";
import { NftService }    from "./nft.service";
import { NftController } from "./nft.controller";
import { diskStorage }   from "multer";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({ destination: "/tmp/uploads" }),
      limits:  { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  providers:   [NftService],
  controllers: [NftController],
  exports:     [NftService],
})
export class NftModule {}
