import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service.common';
import { Repository } from 'typeorm';
import { TypeOfUser } from '../entity/types.entity';

@Injectable()
export class TypeOfUserService extends BaseService<TypeOfUser>{
  constructor(@InjectRepository(TypeOfUser) private repo: Repository<TypeOfUser>) {
    super();
  }
  getAll() : Promise<TypeOfUser[]>{
    return this.getRepository().find();
  }

  getRepository(): Repository<TypeOfUser> {
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

  async create(item: TypeOfUser) {
    this.repo.create(item);
    return await this.repo.save(item);
  }

  async update(id: any,item:TypeOfUser){
    await this.repo.update(id,item);
  }

  async delete(id: any){
    await this.repo.delete(id);
  }
}
