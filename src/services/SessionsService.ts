import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {Session} from "../models/Session";
import {User} from "../models/User";

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

    const session = await this.Session.findOne({accessToken}).populate({ path: 'userId', model: User });

    return session
  }


}
