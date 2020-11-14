import {Inject, Req} from "@tsed/common";
import {$log} from "@tsed/logger";
import {Args, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, StrategyOptions} from "passport-github2";
import {UsersService} from "../services/UsersService";

@Protocol<StrategyOptions>({
  name: "github",
  useStrategy: Strategy,
  settings: {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: `${process.env.SITE_URL}/api/auth/github/callback`,
  }
})
export class GitHubProtocol implements OnVerify, OnInstall {
  @Inject()
  private authService: UsersService;

  $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
    // fail to authentication
    if(profile == null){
      return false
    }

    try {

      // create if new user
      return this.authService.findOrCreate(profile);

    } catch (error) {
      $log.debug("error", error);
      return false
    }
  }

  async $onInstall() {}
}