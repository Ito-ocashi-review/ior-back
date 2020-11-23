import {BodyParams, Controller, Get, PathParams, Post, Put, Delete} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Status, Summary} from "@tsed/schema";
import {ReviewId} from "../decorators/ReviewId";
import {Review} from "../models/Review";
import {ReviewsService} from "../services/ReviewsService";

@Controller({
  path: "/reviews",
})
export class ReviewsCtrl {
  constructor(private ReviewsService: ReviewsService) {}

  @Get("/:id")
  @Summary("Return a review by ID")
  @(Status(200, Review).Description("Success"))
  async get(
    @PathParams("id")
    @ReviewId() 
    id: string): Promise<Review> {
    const review = await this.ReviewsService.find(id);

    if (review) {
      return review;
    }
    throw new NotFound("Review not found");
  }

  @Post("/")
  @Summary("Create a new Review")
  @(Returns(201, Review).Description("Created"))
  async save(
    @Description("Post a review") 
    @Required() 
    @BodyParams() 
    review: Review) {
    return this.ReviewsService.save(review);
  }

  @Put("/:id")
  @Summary("Update review information")
  @(Status(200).Description("Success"))
  async update(
    @Description("Put a review") 
    @PathParams("id") 
    @ReviewId() 
    id: string
    ): Promise<Review> {
    const review = await this.ReviewsService.find(id);

    if(review) {
      return this.ReviewsService.save(review)
    }
    throw new NotFound("Review id not found")
  }

  @Delete("/:id")
  @Summary("Remove an review")
  @(Status(204).Description("No content"))
  async remove(
    @Description("The review id") 
    @Required() 
    @PathParams("id") 
    id: string): Promise<void> {
    return this.ReviewsService.remove(id);
  }
}
