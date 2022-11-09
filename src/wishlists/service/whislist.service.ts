import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/items/entity/item.entity";
import { Party } from "src/parties/entity/party.entity";
import { Repository } from "typeorm";
import { Wishlist } from "../entity/whislist.entity";
@Injectable()
export class WishlistService{
  constructor(
    @InjectRepository(Wishlist) private listRepo: Repository<Wishlist>,
    @InjectRepository(Party) private partyRepo: Repository<Party>,
    @InjectRepository(Item) private itemRepo: Repository<Item>) {

  }

  getRepository(): Repository<Wishlist> {
    return this.listRepo;
  }

  async getWishlist(party_id: number) {
    if((await this.partyRepo.findOneBy({id:party_id})) == null)
      throw new BadRequestException('Party not found');
    const list = await this.listRepo.findOneBy({
      party_id: party_id
    });
    if (list == null)
      throw new BadRequestException('This party does not have a wishlist');
    return list
  }

  async createWishlist(id: number, list: Wishlist) {
    if ((await this.listRepo.findOneBy({party_id:id})))
      throw new BadRequestException('This party already have a wishlist');
    const party = await this.partyRepo.findOneBy({
      id: id
    });
    party.wishlist = list;
    const temp = await this.partyRepo.save(party);
    const _list = list;
    _list.party = temp;
    await this.listRepo.save(_list);
    return await this.listRepo.findOneBy({
      id: _list.id
    });
  }

  async updateWishlist(id: number, list: Wishlist) {
    const party = await this.partyRepo.findOneBy({
      id: id
    });
     if (party == null)
       throw new BadRequestException('Party not found');
     if ((await this.listRepo.findOneBy({party_id:id})) == null)
       throw new BadRequestException('This party does not have a wishlist');
    const _list = {...list , party_id: id, party: party};
    await this.listRepo.update({party_id:id},_list);
    return await this.listRepo.findOneBy({
      party_id: id
    });
  }

  async deleteWishlist(id: number) {
    const party = await this.partyRepo.findOneBy({
      id: id
    });
    if (party == null)
      throw new BadRequestException('Party not found');
    if ((await this.listRepo.findOneBy({party_id:id})) == null)
      throw new BadRequestException('This party does not have a wishlist');
    const list = await this.listRepo.findOneBy({party_id:id})
    if ((await this.itemRepo.findBy({party_id: list.id})).length != 0)
      throw new BadRequestException('This party has items in the wishlist');
    party.wishlist = undefined;
    await this.partyRepo.save(party);
    await this.listRepo.delete({party_id:id});
    return {message: 'Wishlist has been deleted successfully'};
  }

  // async partyExist(party_id: number) {
  //   return await this.partyService.exists(party_id);
  // }

  // async listExist(party_id: number) {
  //   const list = await this.listRepo.findOneBy({  party_id : party_id  });
  //   return list != null;
  // }

  // async getById(id: any) : Promise<Wishlist>{
  //   const list = await this.listRepo.findOneBy({
  //      id: id
  //   });
  //   if (list == null)
  //     throw new BadRequestException('Wishlist not found');
  //   return list;
  // }

  // async getByPartyId(id: number): Promise<Wishlist> {
  //   const list = await this.listRepo.findOneBy({
  //     party_id: id
  //   });

  //   if (list == null)
  //     throw new BadRequestException('Wishlist not found');
  //   return list;
  // }

  // async create(party_id: number, list: Wishlist) {
  //   const partyExist = await this.partyExist(party_id);
  //   if (!partyExist)
  //     throw new BadRequestException('Party not found');
  //   if (await this.listExist(party_id))
  //     throw new BadRequestException('Wishlist already exists for this party');
  //   const temp: Wishlist = { ...list, party_id: party_id };
  //   return await this.listRepo.save(this.listRepo.create(temp));
  // }

  // async update(party_id: number, list: Wishlist) {
  //   if (!(await this.partyExist(party_id)))
  //     throw new BadRequestException('Party not found');
  //   if (!(await this.listExist(party_id)))
  //     throw new BadRequestException('Wishlist not created for this party');
  //   const temp = await this.getByPartyId(party_id);
  //   await this.listRepo.update(temp.id, list);
  //   return await this.getById(temp.id);
  // }

  // async delete(party_id: number) {
  //   if (!(await this.partyExist(party_id)))
  //     throw new BadRequestException('Party not found');
  //   if (!(await this.listExist(party_id)))
  //     throw new BadRequestException('Wishlist not created for this party');

  //   const list = await this.getByPartyId(party_id);
  //   await this.listRepo.delete(list.id);
  //   return "Wishlist deleted";
  //   // await this.itemService.deleteAll(party_id);
  // }
}
