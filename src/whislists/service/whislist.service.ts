import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/service.common";
import { Repository } from "typeorm";
import { Whislist } from "../entity/whislist.entity";

@Injectable()
export class WishlitService extends BaseService<Whislist>{
  constructor(@InjectRepository(Whislist) private listRepo: Repository<Whislist>) {
    super();
  }
  getRepository(): Repository<Whislist> {
    return this.listRepo;
  }

  async getById(id: any) : Promise<Whislist>{
    const user = await this.listRepo.find({
      select: ["description", "link", "image"],
      where: [{ "id": id }]
    });
    if (user.length == 0)
      throw new BadRequestException('Whislist not found');
    return user[0];
  }

  async create(list: Whislist) {
    delete list.link;
    return await this.listRepo.save(this.listRepo.create(list));
  }

  async update(id: any, list: Whislist) {
    if (list.link){
      throw new BadRequestException('You can not update the link');
    }
    return await this.listRepo.update(id, list);
  }
}
