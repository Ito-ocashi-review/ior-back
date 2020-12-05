import {IMiddleware, Middleware, Req,Next} from "@tsed/common";
import * as Express from "express";
import {SessionsService} from "../services/SessionsService";

@Middleware()
export default class HeaderTokenParser implements IMiddleware {

  async use(
      @Req() request: Req,
      @Next() next: Express.NextFunction
  ) {
    const accessToken = request.headers.authorization || null;
    
    if (accessToken == null) {
      return next();
    }
  
    try {
      const session = await SessionsService.findUserByAccessToken(accessToken);
      request.user = session?.userId;
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}