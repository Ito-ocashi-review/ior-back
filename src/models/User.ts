import {Description, Required} from "@tsed/schema";
import {Model} from "@tsed/mongoose";

@Model()
export class User{

  @Description("Username (identifer)")
  @Required()
  username: string;

  @Description("DisplayName")
  @Required()
  displayName: string;

  @Description("FilePath")
  @Required()
  filePath: string;

}
