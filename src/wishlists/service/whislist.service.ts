import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartyService } from "src/parties/service/party.service";
import { Repository } from "typeorm";
import { Wishlist } from "../entity/whislist.entity";
@Injectable()
export class WishlistService{
  constructor(@InjectRepository(Wishlist) private listRepo: Repository<Wishlist>,
   private partyService: PartyService) {
  }
  getRepository(): Repository<Wishlist> {
    return this.listRepo;
  }

  async partyExist(party_id: number) {
    return await this.partyService.exists(party_id);
  }

  async listExist(party_id: number) {
    const list = await this.listRepo.findOneBy({ "party_id": party_id  });
    return list != null;
  }

  async getById(id: any) : Promise<Wishlist>{
    const list = await this.listRepo.findOneBy({
       "id": id
    });
    if (list == null)
      throw new BadRequestException('Wishlist not found');
    return list;
  }

  async getByPartyId(id: number): Promise<Wishlist> {
    const list = await this.listRepo.findOneBy({
      "party_id": id
    });

    if (list == null)
      throw new BadRequestException('Wishlist not found');
    return list;
  }

  async create(party_id: number, list: Wishlist) {
    const partyExist = await this.partyExist(party_id);
    if (!partyExist)
      throw new BadRequestException('Party not found');
    if (await this.listExist(party_id))
      throw new BadRequestException('Wishlist already exists for this party');
    const temp: Wishlist = { ...list, party_id: party_id };
    return await this.listRepo.save(this.listRepo.create(temp));
  }

  async update(party_id: number, list: Wishlist) {
    if (!(await this.partyExist(party_id)))
      throw new BadRequestException('Party not found');
    if (!(await this.listExist(party_id)))
      throw new BadRequestException('Wishlist not created for this party');
    const temp = await this.getByPartyId(party_id);
    await this.listRepo.update(temp.id, list);
    return await this.getById(temp.id);
  }

  async delete(party_id: number) {
    if (!(await this.partyExist(party_id)))
      throw new BadRequestException('Party not found');
    if (!(await this.listExist(party_id)))
      throw new BadRequestException('Wishlist not created for this party');

    const list = await this.getByPartyId(party_id);
    await this.listRepo.delete(list.id);
    return "Wishlist deleted";
    // await this.itemService.deleteAll(party_id);
    // console.log(await (await this.listRepo.findOneBy({ "party_id": party_id })).party.wishlist)
  }
}
