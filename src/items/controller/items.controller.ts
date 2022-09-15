import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controler.common';
import { BaseService } from 'src/common/service.common';
import { Item } from '../entity/item.entity';
import { ItemsService } from '../service/items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController extends BaseController<Item> {
  constructor(private readonly itemsService: ItemsService){
    super();
  }

  getService(): BaseService<Item>{
    return this.itemsService;
  }

  @Get(':id')
  async getById(@Param('id')id: number) : Promise<Item>{
    return await this.itemsService.getById(id);
  }

  @Post()
  async create(@Body() item: Item) {
    return await this.itemsService.create(item);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() item:Item){
    return await this.itemsService.update(id,item);
  }
}
