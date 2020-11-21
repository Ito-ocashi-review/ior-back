import {Description, Required} from "@tsed/schema";
import {Model, ObjectID, Ref} from "@tsed/mongoose";
import {Reply} from "./Reply";
import {User} from "./User";
import { Sweet } from './Sweet';


@Model()
export class Review{
    @ObjectID("id")
    _id: string;

    @Ref(User)
    @Description("User ID")
    userId: Ref<User>

    @Ref(Sweet)
    @Description("Sweet ID")
    sweetId: Ref<User>

    @Ref(Reply)
    @Description("User ID")
    replyId: Ref<Reply>


    @Description("Star")
    @Required()
    star: Number;

    @Description("Comment")
    @Required()
    comment: string;

  
}