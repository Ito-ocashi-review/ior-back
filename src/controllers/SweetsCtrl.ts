import {BodyParams, Controller, Delete, Get, PathParams, Post} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Status, Summary} from "@tsed/schema";
import {SweetId} from "../decorators/SweetId";
import {Sweet} from "../models/Sweet";
import {SweetsService} from "../services/SweetsService";

@Controller({
  path: "/sweets",
})
export class SweetsCtrl {
  constructor(private sweetsService: SweetsService) {}

  @Get("/:id")
  @Summary("Return a sweet by ID")
  @(Status(200, Sweet).Description("Success"))
  async get(@PathParams("id") @SweetId() id: string): Promise<Sweet> {
    const sweet = await this.sweetsService.find(id);

    if (sweet) {
      return sweet;
    }

    throw new NotFound("Sweet not found");
  }

  @Get("/")
  @Summary("Return all sweets")
  @(Status(200, Sweet).Description("Success"))
  async findAll(): Promise<Array<Sweet> | null> {
    return await this.sweetsService.findAll();
  }

  @Post("/")
  @Summary("Create a new Sweet")
  @(Returns(201, Sweet).Description("Created"))
  save(
    @Description("Sweet model")
    @BodyParams()
    @Required()
    sweet: Sweet
  ) {
    return this.sweetsService.save(sweet);
  }

  @Delete("/:id")
  @Summary("Remove an sweet")
  @(Status(204).Description("No content"))
  async remove(
    @Required()
    @Description("The sweet id")
    @PathParams("id")
    id: string
  ): Promise<void> {
    return this.sweetsService.remove(id);
  }
}
