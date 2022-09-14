import { Delete, Get, Param } from "@nestjs/common";
//import { Body, Get, , , Param, Post, UseGuards } from "@nestjs/common";
import { BaseService } from "./service.common";

export abstract class BaseController<T>{

  abstract getService(): BaseService<T>;
  @Get()
  async getAll(): Promise<T[]>{
    return await this.getService().getAll();
  }

  // @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.getService().delete(id);
  }

  @Get()
  async count(): Promise<number> {
    return this.getService().count();
  }
}
