// import {Required,Default,Format} from "@tsed/common";
import {Model, ObjectID, Ref} from "@tsed/mongoose";
import { Description, Integer } from '@tsed/schema';
import { Sweet } from './Sweet';

@Model()
export class SweetAttachment {
  @ObjectID("id")
  _id: string;

  @Ref(Sweet)
  @Description("Sweet ID")
  SweetId: Ref<Sweet>

  @Description("FilePath")
  filePath: string;

  @Description("FileName")
  fileName: string;

  @Description("FileFormat")
  fileFormat: string;

  @Integer()
  @Description("FileSize")
  fileSize: number;
}
