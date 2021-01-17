import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel, ObjectID} from "@tsed/mongoose";
import { request } from 'express';
import {Sweet} from "../models/Sweet";
import {Review} from "../models/Review";
import {ReviewsService} from "../services/ReviewsService";

@Service()
export class SweetsService {
  @Inject(Sweet)
  private Sweet: MongooseModel<Sweet>;

  @Inject(Review)
  private Review: MongooseModel<Review>

  $onInit() {
    this.reload();
  }

  async reload() {
    const sweets = await this.Sweet.find({});

    if (sweets.length === 0) {
      const promises = require("../../resources/sweets.json").map((sweet: any) => this.save(sweet));
      await Promise.all(promises);
    }
  }

  /**
   * Find a sweet by his ID.
   * @param id
   * @returns {undefined|Sweet}
   */
  async find(id: string): Promise<Sweet | null> {
    $log.debug("Search a calendar from ID", id);
    const sweet = await this.Sweet.findById(id).exec();
    $log.debug("Found", sweet);

    return sweet;
  }

  /**
   * Find all sweets
   * @returns {undefined|Arry<Sweet>}
   */
  async findAll(): Promise<Array<Sweet> | null> {
    return await this.Sweet.find({}).populate('review')
  }

  /**
   *
   * @param sweet
   * @returns {Promise<TResult|TResult2|Sweet>}
   */
  async save(sweet: Sweet): Promise<Sweet> {
    $log.debug({message: "Validate sweet", sweet});

    const model = new this.Sweet(sweet);
    $log.debug({message: "Save sweet", sweet});
    await model.updateOne(sweet, {upsert: true});

    $log.debug({message: "Sweet saved", model});

    return model;
  }

  /**
   *
   * @param id
   * @returns {Promise<Sweet>}
   */
  async remove(id: string) {
    await this.Sweet.deleteOne({
      _id: id
    }).exec();
  }

  async getRanking(){
    return await this.Sweet.find({}).populate('review')
  }
}
