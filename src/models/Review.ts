import {Description, Required} from "@tsed/schema";
import {Model} from "@tsed/mongoose";

@Model()
export class Review{

    @Description("Star")
    @Required()
    star: Number;

    @Description("Comment")
    @Required()
    comment: string;
}