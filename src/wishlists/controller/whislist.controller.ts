import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Wishlist } from "../entity/whislist.entity";
import { WishlistService } from "../service/whislist.service";


@ApiTags('Wishlists')
@Controller('party')
export class WishlistController{
  constructor(private readonly listService: WishlistService){
  }

  @Get(':id')
  async getOne(@Param('id') id:number): Promise<Wishlist> {
    return await this.listService.getByPartyId(id);
  }

  @Post(':id')
  async create(@Param('id') id:number ,@Body() list: Wishlist) {
    return await this.listService.create(id, list);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() list: Wishlist) {
    return await this.listService.update(id, list);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.listService.delete(id);
  }

}
