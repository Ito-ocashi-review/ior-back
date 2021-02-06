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
    if(sweets){
      console.log('一つ目のお菓子',sweets[0])
      const reviews = await this.ReviewsService.findBySweetId(sweets[0]._id)
      console.log(reviews)
    }
    // 後でランキングの計算方法を考えて実装
    const sweetsRanking = [
      {name: "kitkat",evaluation:4.7},
      {name: "ぼたぼた焼き",evaluation:4.5},
      {name: "じゃがりこ",evaluation:4.1},
      {name: "うまい棒",evaluation:3.7},
      {name: "ハイチュー",evaluation:2.7},
      {name: "キャベツ太郎",evaluation:1.2},
    ]
    return sweetsRanking;
  }
}