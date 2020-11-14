import {Controller} from "@tsed/common";
import {UsersService} from "../services/UsersService";

@Controller({
  path: "/users",
})
export class UsersCtrl {
  constructor(private usersService: UsersService) {}

}
