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
        return {name:sweet.name, evaluation: 0};
      }

      const scoreAmount = reviews?.map((review)=>{
        return Number(review.star)
      }).reduce((accumulator,currentValue)=>{
        return accumulator + currentValue
      })

      if(scoreAmount && reviews?.length){
        return {name:sweet.name, evaluation: (scoreAmount/reviews?.length).toFixed(2)}
      }else{
        return {name:sweet.name, evaluation: 0};
      }
    })

    let sweetsRankingData
    if(sweetScore){
      sweetsRankingData = await Promise.all(sweetScore);
    }

    // 評価の値で昇順にソート
    const sortedSweetsRankingData = sweetsRankingData?.sort((a,b) => {
      return Number(b.evaluation) - Number(a.evaluation);
    })

    return sortedSweetsRankingData;
  }
}