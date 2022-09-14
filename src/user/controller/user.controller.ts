import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/common/controler.common";
import { BaseService } from "src/common/service.common";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";


@ApiTags('Users')
@Controller('users')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService){
    super();
  }
  getService(): BaseService<User>{
    return this.userService;
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<User> {
    return await this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await this.userService.update(id, user);
  }

}
