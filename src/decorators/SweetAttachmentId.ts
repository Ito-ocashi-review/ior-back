import {useDecorators} from "@tsed/core";
import {ObjectID} from "@tsed/mongoose";
import {Description} from "@tsed/schema";

export function SweetAttachmentId() {
  return useDecorators(ObjectID(), Description("The sweetAttachment id"));
}
