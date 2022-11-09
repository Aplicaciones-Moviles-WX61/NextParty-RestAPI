import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../entity/types.entity';
import { RoleService } from '../service/roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService){
    // super();
  }

  @Get()
  async getAll() : Promise<Roles[]>{
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() item: Roles) {
    return await this.service.create(item);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() item:Roles){
    return await this.service.update(id,item);
  }

  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.service.delete(id);
  }
}
