import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/service.common";
import { PartyService } from "src/parties/service/party.service";
import { Repository } from "typeorm";
import { Wishlist } from "../entity/whislist.entity";
@Injectable()
export class WishlistService extends BaseService<Wishlist>{
  constructor(@InjectRepository(Wishlist) private listRepo: Repository<Wishlist>, private partyService: PartyService) {
    super();
  }
  getRepository(): Repository<Wishlist> {
    return this.listRepo;
  }

  async getById(id: any) : Promise<Wishlist>{
    const list = await this.listRepo.find({
      select: ["description", "image", "party_id"],
      where: [{ "id": id }]
    });
    if (list.length == 0)
      throw new BadRequestException('Wishlist not found');
    return list[0];
  }

  async getByPartyId(id: number) {
    const list = await this.listRepo.find({
      select: [ "id", "party_id","description", "image"],
      where: [{ "party_id": id }]
    });

    if (list.length == 0)
      throw new BadRequestException('Wishlist not found');
    return list[0];
  }

  async partyExist(id: number) {
    return await this.partyService.exists(id);
  }

  async create(party_id: number, list: Wishlist) {
    const partyExist = await this.partyService.exists(party_id);
    if (!partyExist)
      throw new BadRequestException('Party not found');
    const temp: Wishlist = { ...list, party_id: party_id };
    return await this.listRepo.save(this.listRepo.create(temp));
  }

  async update(id: any, list: Wishlist) {
    return await this.listRepo.update(id, list);
  }
}
