import {IMiddleware, Middleware, Req,Next} from "@tsed/common";
import * as Express from "express";
import {SessionsService} from "../services/SessionsService";

@Middleware()
export default class HeaderTokenParser implements IMiddleware {
constructor(private sessionsService: SessionsService) {}

  async use(
      @Req() request: Req,
      @Next() next: Express.NextFunction
  ) {
    const accessToken = request.headers.authorization || null;
    
    if (accessToken == null) {
      return next();
    }
  
    try {
      const session = await this.sessionsService.findUserByAccessToken(accessToken);
      request.user = session?.userId;
      return next()
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}