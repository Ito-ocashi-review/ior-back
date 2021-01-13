import {Model, ObjectID} from "@tsed/mongoose";
import { Default, Format, Required } from "@tsed/schema";

@Model()
export class Sweet {
  @ObjectID("id")
  _id: string;

  @Required()
  name: string;

  @Format("date-time")
  @Default(Date.now)
  createdAt: Date = new Date();
}
