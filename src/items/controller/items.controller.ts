import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Item } from '../entity/item.entity';
import { ItemsService } from '../service/items.service';

@ApiTags('Items')
@Controller('party/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService){
  }

  @Get(':id')
  async getById(@Param('id')id: number) : Promise<Item[]>{
    return await this.itemsService.getByPartyId(id);
  }

  @Post(':id')
  async create(@Param ('id') wishlist_id: number, @Body() item: Item) {
    return await this.itemsService.create(wishlist_id, item);
  }

  @Put(':id')
  async update(@Param('id')id: number, @Body() item:Item){
    return await this.itemsService.update(id,item);
  }

  @Delete(":id")
  async delete(@Param('id') id : number){
    return await this.itemsService.delete(id);
  }

}
