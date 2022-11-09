import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Item } from '../entity/item.entity';
import { ItemsService } from '../service/items.service';

@ApiBearerAuth()
@ApiTags('Items')
@Controller('party')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService){
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/items')
  async getById(@Param('id')id: number) : Promise<Item[]>{
    return await this.itemsService.getItemsList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/items')
  async create(@Param ('id') wishlist_id: number, @Body() item: Item) {
    return await this.itemsService.create(wishlist_id, item);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put(':id/items')
  // async update(@Param('id')id: number, @Body() items:Item[]){
  //   return await this.itemsService.update(id,items);
  // }

  @UseGuards(JwtAuthGuard)
  @Put(':id/items/:item_id')
  async update(@Param('id')id: number , @Param('item_id') item_id: number , @Body() item:Item){
    return await this.itemsService.update(id,item_id, item);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(":id/items")
  async delete(@Param('id') id : number){
    return await this.itemsService.deleteAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/items/:item_id")
  async deleteItem(@Param('id') id : number, @Param('item_id') item_id: number){
    return await this.itemsService.deleteItem(id,item_id);
  }
}
