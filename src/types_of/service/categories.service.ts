import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entity/types.entity';

@Injectable()
export class CategoryService{
  constructor(@InjectRepository(Categories) private repo: Repository<Categories>) {
  }

  getAll() : Promise<Categories[]>{
    return this.repo.find();
  }

  async create(item: Categories) {
    const items = await this.repo.findBy(
      {
        category: item.category
      }
    )
    console.log(items.length);
    if (items.length != 0)
      throw new BadRequestException('Category already exists');
    await this.repo.save(this.repo.create(item));
  }

  async update(id: number,item:Categories){
    await this.repo.update(id,item);
  }

  async delete(id: number){
    await this.repo.delete(id);
  }
}
