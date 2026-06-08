import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ConfigService }  from "@nestjs/config";
import { PrismaService }  from "../prisma/prisma.service";
import * as FormData      from "form-data";
import axios              from "axios";

@Injectable()
export class NftService {
  constructor(
    private readonly prisma:  PrismaService,
    private readonly config:  ConfigService,
  ) {}

  async findAll(page = 1, limit = 20, collectionId?: string) {
    const skip  = (page - 1) * limit;
    const where = collectionId ? { collectionId } : {};
    const [data, total] = await Promise.all([
      this.prisma.nFT.findMany({
        where, skip, take: limit,
        orderBy: { mintedAt: "desc" },
        include: { collection: true, listings: { where: { isActive: true } } },
      }),
      this.prisma.nFT.count({ where }),
    ]);
    return { data, total, page, limit };
  }

  async findById(id: string) {
    const nft = await this.prisma.nFT.findUnique({
      where: { id },
      include: {
        collection: true,
        listings:   { where: { isActive: true } },
        bids:       { orderBy: { amount: "desc" }, take: 10 },
        transfers:  { orderBy: { timestamp: "desc" }, take: 20 },
      },
    });
    if (!nft) throw new NotFoundException("NFT not found");
    return nft;
  }

  async uploadToIPFS(buffer: Buffer, filename: string): Promise<string> {
    const apiKey    = this.config.get("PINATA_API_KEY");
    const secretKey = this.config.get("PINATA_SECRET_KEY");

    if (!apiKey || !secretKey) {
      throw new BadRequestException("IPFS upload not configured");
    }

    const form = new FormData();
    form.append("file", buffer, { filename });

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      form,
      {
        headers: {
          ...form.getHeaders(),
          pinata_api_key:        apiKey,
          pinata_secret_api_key: secretKey,
        },
      }
    );

    return `ipfs://${res.data.IpfsHash}`;
  }

  async recordMint(data: {
    tokenId:      string;
    contractAddr: string;
    ownerAddr:    string;
    tokenUri:     string;
    collectionId: string;
    txHash:       string;
    chainId:      number;
  }) {
    return this.prisma.nFT.create({
      data: {
        tokenId:      data.tokenId,
        contractAddr: data.contractAddr,
        ownerAddr:    data.ownerAddr,
        tokenUri:     data.tokenUri,
        collectionId: data.collectionId,
        txHash:       data.txHash,
        chainId:      data.chainId,
      },
    });
  }

  async getCollections() {
    return this.prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { nfts: true } } },
    });
  }

  async getListings(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.nFTListing.findMany({
        where: { isActive: true },
        skip, take: limit,
        orderBy: { listedAt: "desc" },
        include: { nft: { include: { collection: true } } },
      }),
      this.prisma.nFTListing.count({ where: { isActive: true } }),
    ]);
    return { data, total, page, limit };
  }
}
