import {Description, Required} from "@tsed/schema";
import {Model} from "@tsed/mongoose";

@Model()
export class User{

  @Description("Username (identifer)")
  @Required()
  name: string;

  @Description("UserImage")
  image: string

}
