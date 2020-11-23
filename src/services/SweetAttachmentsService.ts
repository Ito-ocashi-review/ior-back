import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {SweetAttachment} from "../models/SweetAttachment";

@Service()
export class SweetAttachmentsService {
  @Inject(SweetAttachment)
  private SweetAttachment: MongooseModel<SweetAttachment>;

  $onInit() {
    this.reload();
  }

  async reload() {
    const attachments = await this.SweetAttachment.find({});

    if (attachments.length === 0) {
      const promises = require("../../resources/attachment.json").map((attachment: any) => this.save(attachment));
      await Promise.all(promises);
    }
  }

  /**
   * Find a attachment by his ID.
   * @param id
   * @returns {undefined|SweetAttachment}
   */
  async find(id: string): Promise<SweetAttachment | null> {

    const attachment = await this.SweetAttachment.findById(id).exec();

    $log.debug("Found", attachment);

    return attachment;
  }

  /**
   *
   * @param attachment
   * @returns {Promise<TResult|TResult2|SweetAttachment>}
   */
  async save(attachment: SweetAttachment): Promise<SweetAttachment> {
    $log.debug({message: "Validate attachmebnt", attachment});

    const model = new this.SweetAttachment(attachment);
    $log.debug({message: "Save attachment", attachment});
    await model.updateOne(attachment, {upsert: true});

    $log.debug({message: "SweetAttachment saved", model});

    return model;
  }

}
