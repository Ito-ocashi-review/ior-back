import {useDecorators} from "@tsed/core";
import {ObjectID} from "@tsed/mongoose";
import {Description} from "@tsed/schema";

export function ReviewId() {
  return useDecorators(ObjectID(), Description("The review id"));
}
