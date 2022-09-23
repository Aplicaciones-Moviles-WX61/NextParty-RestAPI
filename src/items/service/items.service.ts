import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistService } from 'src/wishlists/service/whislist.service';
import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';
@Injectable()
export class ItemsService{
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>,
  private wishlistService: WishlistService) {
  }

  getRepository(): Repository<Item> {
    return this.itemRepo;
  }

  async partyExist(party_id: number) {
    return await this.wishlistService.partyExist(party_id);
  }

  async listExist(party_id: number) {
    return await this.wishlistService.listExist(party_id);
  }

  async getByPartyId(id: number) {
    const partyExist = await this.partyExist(id);
    if (!partyExist)
      throw new Error('Party not found');
    const wishlist = await this.wishlistService.getByPartyId(id);
    const list = await this.itemRepo.findBy({
       "party_id": wishlist.id
    });
    return list;
  }

  async create(party_id: number, item: Item) {
    const exists = await this.partyExist(party_id);
    if (!exists)
      throw new Error('Party not found');
    const whishlist = await this.wishlistService.getByPartyId(party_id);
    const temp: Item = { ...item, party_id: whishlist.id};
    return await this.itemRepo.save(this.itemRepo.create(temp));
  }

  async deleteAll(party_id: number) {
    if (!(await this.partyExist(party_id)))
      throw new Error('Party not found');
    if (!(await this.wishlistService.listExist(party_id)))
      throw new Error('Wishlist not created for this party');
    const wishlist = await this.wishlistService.getByPartyId(party_id);
    const items = await this.itemRepo.findBy({ "party_id": wishlist.id });
    for (const item of items) {
      await this.itemRepo.delete(item.id);
    }
    return "All items the wishlist have been deleted";
  }
}
