import {BodyParams, Controller, Get, Post, Req} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import {Returns} from "@tsed/schema";
import {Credentials} from "../models/Credentials";
import {User} from "../models/User";


@Controller({
  path: "/auth",
})
export class PassportCtrl {
  constructor() {
  }

  @Post("/login")
  @Authenticate("login", {failWithError: false})
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

}
