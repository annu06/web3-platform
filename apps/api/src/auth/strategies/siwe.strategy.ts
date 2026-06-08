import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy }         from "passport-custom";
import { Request }          from "express";
import { AuthService }      from "../auth.service";

@Injectable()
export class SiweStrategy extends PassportStrategy(Strategy, "siwe") {
  constructor(private readonly auth: AuthService) {
    super();
  }

  async validate(req: Request) {
    const { message, signature } = req.body as { message: string; signature: string };
    return this.auth.verifySiwe(message, signature);
  }
}
