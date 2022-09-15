import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service.common';
import { Repository } from 'typeorm';
import { ItemTypes } from '../entity/types.entity';

@Injectable()
export class ItemTypesService extends BaseService<ItemTypes>{
  constructor(@InjectRepository(ItemTypes) private repo: Repository<ItemTypes>) {
    super();
  }

  getRepository(): Repository<ItemTypes> {
    return this.repo;
  }

  getAll() : Promise<ItemTypes[]>{
    return this.getRepository().find();
  }

  // async getById(id: any) : Promise<ItemTypes>{
  //   const items = await this.repo.find({
  //     select: ["type"],
  //     where: [{ "id": id }]
  //   });
  //   if (items.length == 0)
  //     throw new BadRequestException('Element not found');
  //   return items[0];
  // }

  async create(item: ItemTypes) {
    this.repo.create(item);
    return await this.repo.save(item);
  }

  async update(id: any,item:ItemTypes){
    await this.repo.update(id,item);
  }

  async delete(id: any){
    await this.repo.delete(id);
  }
}
