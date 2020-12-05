import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {Session} from "../models/Session";

@Service()
export class SessionsService {
  @Inject(Session)
  private Session: MongooseModel<Session>;

  /**
   * Find a user or create user for new register
   * @param email
   * @returns {undefined|User}
   */
  async findUserByAccessToken(accessToken:string): Promise<null | Session> {
    $log.debug("Search a session by accessToken");

    return this.Session.findOne({accessToken}).exec();
  }


}
