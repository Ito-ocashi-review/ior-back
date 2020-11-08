import {Controller, Post, Get, Req,BodyParams} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {Returns} from "@tsed/schema";
import {User} from "../models/User";
import {Credentials} from "../models/Credentials";

@Controller({
  path: "/auth",
})
export class PassportCtrl {
  constructor() {
  }

  @Post("/login")
  @Authenticate("local", {failWithError: false})
  @Returns(200, User)
  @Returns(400).Description("Validation error")
  login(@Req() req: Req, @BodyParams() credentials: Credentials) {
    // FACADE
    return req.user;
  }

  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

  @Get("/connect/:protocol")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocol(@Req() req: Req): any {
    // FACADE
    return req.user;
  }


  @Get("/connect/:protocol/callback")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocolCallback(@Req() req: Req): any {
    // FACADE
    return req.user;
  }

}
