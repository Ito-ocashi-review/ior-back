import {MaxLength} from "@tsed/schema";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class MyModel {
  @ObjectID("id")
  _id: string;

  @MaxLength(140)
  comment: string;

  isGood: boolean;
}