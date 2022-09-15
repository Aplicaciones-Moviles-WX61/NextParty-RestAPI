import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/common/controler.common";
import { BaseService } from "src/common/service.common";
import { Wishlist } from "../entity/whislist.entity";
import { WishlitService } from "../service/whislist.service";


@ApiTags('Whishlists')
@Controller('whishlists')
export class WishlitController extends BaseController<Wishlist> {
  constructor(private readonly listService: WishlitService){
    super();
  }
  getService(): BaseService<Wishlist>{
    return this.listService;
  }

  // @Get(':id')
  // async findOne(@Param('id') id:number): Promise<Whislist> {
  //   return await this.listService.getById(id);
  // }

  @Post(':id')
  async create(@Param('id') id:number ,@Body() list: Wishlist) {
    return await this.listService.create(id, list);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() list: Wishlist) {
    return await this.listService.update(id, list);
  }

}
