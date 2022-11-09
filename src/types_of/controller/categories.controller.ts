import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Categories } from '../entity/types.entity';
import { CategoryService } from '../service/categories.service';

@ApiTags('Categorias')
@Controller('categories')
export class CategoryController{
  constructor(private readonly service: CategoryService){
  }

  @Get()
  async getAll() : Promise<Categories[]>{
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() item: Categories) {
    return await this.service.create(item);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() item:Categories){
    return await this.service.update(id,item);
  }

  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.service.delete(id);
  }

}
