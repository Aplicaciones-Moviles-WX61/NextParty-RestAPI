import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../entity/types.entity';

@Injectable()
export class RoleService{
  constructor(@InjectRepository(Roles) private repo: Repository<Roles>) {
  }

  getAll() : Promise<Roles[]>{
    return this.repo.find();
  }

  async create(item: Roles) {
    const items = await this.repo.findBy(
      {
        role: item.role
      }
    )
    if (items.length != 0)
      throw new BadRequestException('Role already exists');
    return await this.repo.save(this.repo.create(item));
  }

  async update(id: number,item:Roles){
    await this.repo.update(id,item);
  }

  async delete(id: number){
    await this.repo.delete(id);
  }
}
