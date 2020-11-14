import {Controller, Get, Req, Res,Redirect} from "@tsed/common";
import {Authorize} from "@tsed/passport";
import {Returns} from "@tsed/schema";
import {User} from "../models/User";

@Controller({
  path: "/auth",
})
export class PassportCtrl {
  constructor() {
  }

  @Get("/logout")
  logout(@Req() req: Req) {
    req.logout();
  }

  @Get("/:protocol")
  @Authorize(":protocol")
  @Returns(200, User)
  connectProtocol(@Req() req: Req): any {
    // FACADE
    return req.user;
  }

  @Get("/:protocol/callback")
  @Authorize(":protocol")
  @Redirect('http://localhost:3000')
  @Returns(200, User)
  connectProtocolCallback(@Req() req: Req,res: Res): any {
    return Redirect(302,'http://localhost:3000');
  }

}
