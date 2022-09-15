import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service.common';
import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';

@Injectable()
export class ItemsService extends BaseService<Item>{
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {
    super();
  }

  getRepository(): Repository<Item> {
    return this.itemRepo;
  }

  async getById(id: any) : Promise<Item>{
    const items = await this.itemRepo.find({
      select: ["name", "description", "quantity", "image"],
      where: [{ "id": id }]
    });
    if (items.length == 0)
      throw new BadRequestException('Element not found');
    return items[0];
  }

  async create(item: Item) {
    this.itemRepo.create(item);
    return await this.itemRepo.save(item);
  }

  async update(id: any,item:Item){
    await this.itemRepo.update(id,item);
  }
}
