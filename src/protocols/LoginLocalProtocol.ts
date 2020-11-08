import {BodyParams, Req} from "@tsed/common";
import {OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {Credentials} from "../models/Credentials";
import {UsersService} from "../services/UsersService";


@Protocol<IStrategyOptions>({
  name: "local",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private usersService: UsersService) {
  }

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const {email, password} = credentials;

    const user = await this.usersService.findByEmail(email);

    if (user == null) {
      return false
    }

    // TODO hash user password
    if (!user.isPasswordVerify(password)) {
      return false;
    }

    return user;
  }

  $onInstall(strategy: Strategy): void {}
}