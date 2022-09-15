import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemTypes } from '../entity/types.entity';
import { ItemTypesService } from '../service/item.service';

@ApiTags('Types')
@Controller('item/types')
export class ItemTypesController{
  constructor(private readonly service: ItemTypesService){
  }

  @Get()
  async getAll() : Promise<ItemTypes[]>{
    return await this.service.getAll();
  }

  // @Get(':id')
  // async getById(@Param('id')id: number) : Promise<ItemTypes>{
  //   return await this.service.getById(id);
  // }

  @Post()
  async create(@Body() item: ItemTypes) {
    return await this.service.create(item);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() item:ItemTypes){
    return await this.service.update(id,item);
  }

  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.service.delete(id);
  }

}
