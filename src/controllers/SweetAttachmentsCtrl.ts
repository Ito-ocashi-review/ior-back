import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Status, Summary} from "@tsed/schema";
import {SweetAttachment} from "../models/SweetAttachment";
import {SweetAttachmentId} from "../decorators/SweetAttachmentId"
import {SweetAttachmentsService} from '../services/SweetAttachmentsService';

@Controller({
  path: "/attachments",
})
export class SweetAttachmentsCtrl {
  constructor(private SweetAttachmentsService: SweetAttachmentsService) {}

  @Get("/:id")
  @Summary("Return a review by ID")
  @(Status(200, SweetAttachment).Description("Success"))
  async get(@PathParams("id") @SweetAttachmentId() id: string): Promise<SweetAttachment> {
    const attachment = await this.SweetAttachmentsService.find(id);

    if (attachment) {
      return attachment;
    }

    throw new NotFound("attachment not found");
  }

  @Post("/")
  @Summary("Create a new Review")
  @(Returns(201, SweetAttachment).Description("Created"))
  save(
    @Description("SweetAttachment model")
    @BodyParams()
    @Required()
    attachment: SweetAttachment
  ) {
    return this.SweetAttachmentsService.save(attachment);
  }

}
