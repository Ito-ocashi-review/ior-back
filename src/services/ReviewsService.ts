import {Inject, Service} from "@tsed/common";
import {$log} from "@tsed/logger";
import {MongooseModel} from "@tsed/mongoose";
import {Review} from "../models/Review";
import {Sweet} from "../models/Sweet";

@Service()
export class ReviewsService {
  @Inject(Review)
  private Review: MongooseModel<Review>;

  @Inject(Sweet)
  private Sweet: MongooseModel<Sweet>;

  $onInit() {
    this.reload();
  }

  async reload() {
    const reviews = await this.Review.find({});

    if (reviews.length === 0) {
      const promises = require("../../resources/reviews.json").map((review: any) => this.save(review));
      await Promise.all(promises);
    }
  }

  /**
   * Find a review by his ID.
   * @param id
   * @returns {undefined|Review}
   */
  async find(id: string): Promise<Review | null> {

    const review = await this.Review.findById(id).exec();

    $log.debug("Found", review);

    return review;
  }

  /**
   *
   * @param review
   * @returns {Promise<TResult|TResult2|Review>}
   */
  async save(review: Review): Promise<Review> {
    $log.debug({message: "Validate review", review});

    const model = new this.Review(review);
    $log.debug({message: "Save review", review});
    await model.updateOne(review, {upsert: true});

    $log.debug({message: "Review saved", model});

    return model;
  }

    /**
   *
   * @param id
   * @returns {Promise<Review>}
   */
  async remove(id: string) {
    await this.Review.deleteOne({
      _id: id
    }).exec();
  }

  async getRanking(){
    const reviews = await this.Review.find({}).populate('sweetId').populate('userId');
    console.log(reviews)
    console.log("お菓子です",await this.Sweet.findById("5ce7ad3028890bd71749d477").exec())

    return await this.Review.find({}).populate('sweetId').populate('userId')
  }

}
