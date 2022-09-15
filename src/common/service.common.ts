import { FindManyOptions, Repository } from "typeorm";

export abstract class BaseService<T>{
  abstract getRepository(): Repository<T>;

  getAll() : Promise<T[]>{
    return this.getRepository().find();
  }

  // async save(entity: T) {
  //   this.getRepository().save(entity)
  // }

  // saveMany(entities: T[]) : Promise<T[]>{
  //   return this.getRepository().save(entities);
  // }

  async delete (id : number){
    await this.getRepository().delete(id)
  }


  count(options?: FindManyOptions<T>): Promise<number> {
    return this.getRepository().count(options);
  }

}
