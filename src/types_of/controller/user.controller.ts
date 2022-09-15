import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeOfUser } from '../entity/types.entity';
import { TypeOfUserService } from '../service/user.service';

@ApiTags('Types')
@Controller('user/types')
export class TypeOfUserController {
  constructor(private readonly service: TypeOfUserService){
    // super();
  }

  @Get()
  async getAll() : Promise<TypeOfUser[]>{
    return await this.service.getAll();
  }

  // @Get(':id')
  // async getById(@Param('id')id: number) : Promise<TypeOfUser>{
  //   return await this.service.getById(id);
  // }

  @Post()
  async create(@Body() item: TypeOfUser) {
    return await this.service.create(item);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() item:TypeOfUser){
    return await this.service.update(id,item);
  }

  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.service.delete(id);
  }
}
