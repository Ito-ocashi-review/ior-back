import {Controller, Get} from "@tsed/common";
import { SweetsService } from "../services/SweetsService";

@Controller("/ranking")
export class SweetsRankingCtrl {
  constructor(private SweetsService: SweetsService) {}
  @Get("/")
  async findAll() {
    const sweets = await this.SweetsService.findAll();
    return sweets;
  }
}