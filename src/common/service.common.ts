import { FindManyOptions, Repository } from "typeorm";

export abstract class BaseService<T>{
  abstract getRepository(): Repository<T>;

  getAll() : Promise<T[]>{
    return this.getRepository().find();
  }

  async delete (id : number){
    await this.getRepository().delete(id)
  }

  count(options?: FindManyOptions<T>): Promise<number> {
    return this.getRepository().count(options);
  }

}
