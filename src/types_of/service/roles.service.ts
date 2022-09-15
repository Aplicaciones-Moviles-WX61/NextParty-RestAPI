import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service.common';
import { Repository } from 'typeorm';
import { Roles } from '../entity/types.entity';

@Injectable()
export class RoleService extends BaseService<Roles>{
  constructor(@InjectRepository(Roles) private repo: Repository<Roles>) {
    super();
  }
  getAll() : Promise<Roles[]>{
    return this.getRepository().find();
  }

  getRepository(): Repository<Roles> {
    return this.repo;
  }

  // async getById(id: any) : Promise<TypeOfUser>{
  //   const items = await this.repo.find({
  //     select: ["type"],
  //     where: [{ "id": id }]
  //   });
  //   if (items.length == 0)
  //     throw new BadRequestException('Element not found');
  //   return items[0];
  // }

  async create(item: Roles) {
    this.repo.create(item);
    return await this.repo.save(item);
  }

  async update(id: any,item:Roles){
    await this.repo.update(id,item);
  }

  async delete(id: any){
    await this.repo.delete(id);
  }
}
