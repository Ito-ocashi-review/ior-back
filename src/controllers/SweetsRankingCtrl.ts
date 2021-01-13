import {Controller, Get} from "@tsed/common";
import { SweetsService } from "../services/SweetsService";
import { ReviewsService} from "../services/ReviewsService";

@Controller("/ranking")
export class SweetsRankingCtrl {
  constructor(private SweetsService: SweetsService,private ReviewsService: ReviewsService) {}
  @Get("/")
  async findAll() {
    return await this.ReviewsService.getRanking();
  }
}