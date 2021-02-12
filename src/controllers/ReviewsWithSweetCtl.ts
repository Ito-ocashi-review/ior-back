import {Controller, Get, PathParams,} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Status, Summary} from "@tsed/schema";
import {SweetId} from "../decorators/SweetId";
import {Review} from "../models/Review";
import {ReviewsService} from "../services/ReviewsService";
import {SessionsService} from "../services/SessionsService";

@Controller({
  path: "/sweet/reviews",
})

export class ReviewsWithSweetCtrl {
  constructor(private ReviewsService: ReviewsService, private SessionsService: SessionsService) {}

  @Get("/:id")
  @Summary("Return a reviews associated with sweet")
  @(Status(200, Review).Description("Success"))
  async get(
    @PathParams("id")
    @SweetId() 
    id: string): Promise<Review[]|null> {
    const reviews = await this.ReviewsService.findBySweetId(id);
    if(reviews){
      return reviews
    }
    throw new NotFound("Review not found");
  }
}