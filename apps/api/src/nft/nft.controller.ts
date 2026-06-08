import {
  Controller, Get, Post, Body, Param, Query,
  UseGuards, UseInterceptors, UploadedFile,
} from "@nestjs/common";
import { AuthGuard }          from "@nestjs/passport";
import { FileInterceptor }    from "@nestjs/platform-express";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { NftService }         from "./nft.service";

@ApiTags("nft")
@Controller("nft")
export class NftController {
  constructor(private readonly nft: NftService) {}

  @Get()
  findAll(
    @Query("page")         page         = "1",
    @Query("limit")        limit        = "20",
    @Query("collectionId") collectionId?: string,
  ) {
    return this.nft.findAll(+page, +limit, collectionId);
  }

  @Get("collections")
  collections() {
    return this.nft.getCollections();
  }

  @Get("listings")
  listings(@Query("page") page = "1", @Query("limit") limit = "20") {
    return this.nft.getListings(+page, +limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.nft.findById(id);
  }

  @Post("upload")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const uri = await this.nft.uploadToIPFS(file.buffer, file.originalname);
    return { uri };
  }

  @Post("record-mint")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  recordMint(@Body() body: {
    tokenId:      string;
    contractAddr: string;
    ownerAddr:    string;
    tokenUri:     string;
    collectionId: string;
    txHash:       string;
    chainId:      number;
  }) {
    return this.nft.recordMint(body);
  }
}
