import {Description,Ref } from "@tsed/schema";
import {Model} from "@tsed/mongoose";
import { User } from './User';

@Model()
export class Session{

  @Ref(User)
  @Description("User ID")
  userId: Ref<User>

  @Description("Access Token")
  accessToken: string;
}
