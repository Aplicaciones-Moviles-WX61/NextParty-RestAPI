import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Party } from "src/parties/entity/party.entity";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService){
  }

  @Get()
  async getAll() : Promise<User[]>{
    return await this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id:number ): Promise<User> {
    return await this.userService.getById(id);
  }

  // @Post('register')
  // async create(@Body() user: User) {
  //   return await this.userService.create(user);
  // }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await this.userService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/party')
  async party(@Param('id') id:number , @Body() party: Party) {
    return await this.userService.createParty(id,party);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/:item_id')
  async checkItem(@Param('id') id:number , @Param('item_id') item_id:number) {
    return await this.userService.checkItem(id,item_id);
  }
}
