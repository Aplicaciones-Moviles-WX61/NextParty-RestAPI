import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService){
  }

  @Get()
  async getAll() : Promise<User[]>{
    return await this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<User> {
    return await this.userService.getById(id);
  }

  @Post('register')
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

}
