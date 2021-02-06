import {Controller, Get} from "@tsed/common";
import { SweetsService } from "../services/SweetsService";
import {Sweet} from "../models/Sweet";
import {Review} from '../models/Review';
import { ReviewsService} from "../services/ReviewsService";

@Controller("/ranking")
export class SweetsRankingCtrl {
  constructor(private SweetsService: SweetsService,private ReviewsService: ReviewsService) {}
  @Get("/")
  async getRanking() {
    const sweets : Sweet[] | null = await this.SweetsService.findAll();

    const sweetScore = sweets?.map(async(sweet) => {
      const reviews = await this.ReviewsService.findBySweetId(sweet._id)
      // レビューが一つもなかったら、平均値を0で返す
      if(reviews?.length===0){
        return {name:sweet.name, averageScore: 0};
      }

      const scoreAmount = reviews?.map((review)=>{
        return Number(review.star)
      }).reduce(function(accumulator,currentValue){
        return accumulator + currentValue
      })

      if(scoreAmount && reviews?.length){
        return {sweetId:sweet.name, averageScore: (scoreAmount/reviews?.length).toFixed(2)}
      }else{
        return {sweetId:sweet.name, averageScore: 0};
      }
    })

    let sweetsRankingData
    if(sweetScore){
      sweetsRankingData = await Promise.all(sweetScore);
    }

    return sweetsRankingData;
  }
}