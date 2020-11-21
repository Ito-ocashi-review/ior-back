import {MaxLength} from "@tsed/schema";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class Reply {
  @ObjectID("id")
  _id: string;

  @MaxLength(140)
  comment: string;

  isGood: boolean;
}