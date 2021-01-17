import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {User} from "../models/User";

@Service()
export class UsersService {
    @Inject(User)
    private User: MongooseModel<User>;

    $onInit() {
        this.reload();
    }

    async reload() {
        const users = await this.User.find({});

        if (users.length === 0) {
        const promises = require("../../resources/users.json").map((user: any) => this.save(user));
        await Promise.all(promises);
        }
    }

  /**
   * Find a user or create user for new register
   * @param email
   * @returns {undefined|User}
   */
  async findOrCreate(profile:{name:string,image:string}): Promise<User> {
    $log.debug("Search a user from username", profile.name);
    const user = await this.User.findOne({username:profile.name}).exec();

    // Return if existing user
    if(user != null){
      $log.debug("Found", user);
      return user
    }

    // create new user
    return this.save({
      name:profile.name,
      image:profile.image,
    })    
  }

  async save(user: User): Promise<User> {
    $log.debug({message: "Validate user", user});

    const model = new this.User(user);
    $log.debug({message: "Save user", user});
    await model.updateOne(user, {upsert: true});

    $log.debug({message: "User saved", model});

    return model;
  }

}
