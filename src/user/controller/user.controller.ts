import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/common/controler.common";
import { BaseService } from "src/common/service.common";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";


@ApiTags('Users')
@Controller('user')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService){
    super();
  }
  getService(): BaseService<User>{
    return this.userService;
  }
}
