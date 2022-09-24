import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Item } from '../entity/item.entity';
import { ItemsService } from '../service/items.service';

@ApiTags('Items')
@Controller('party')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService){
  }

  @Get(':id/items')
  async getById(@Param('id')id: number) : Promise<Item[]>{
    return await this.itemsService.getItemsList(id);
  }

  @Post(':id/items')
  async create(@Param ('id') wishlist_id: number, @Body() item: Item) {
    return await this.itemsService.create(wishlist_id, item);
  }

  @Put(':id/items')
  async update(@Param('id')id: number, @Body() items:Item[]){
    return await this.itemsService.update(id,items);
  }

  @Delete(':id/items')
  async deleteAll(@Param('id') party_id: number) {
    return await this.itemsService.deleteAll(party_id);
  }

  @Delete(":id/items")
  async delete(@Param('id') id : number){
    return await this.itemsService.deleteAll(id);
  }
  @Delete(":id/items/:item_id")
  async deleteItem(@Param('id') id : number, @Param('item_id') item_id: number){
    return await this.itemsService.deleteItem(id,item_id);
  }
}
