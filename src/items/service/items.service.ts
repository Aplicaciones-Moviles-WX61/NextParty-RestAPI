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

  async getByPartyId(id: any) {
    const partyExist = await this.wishlistService.partyExist(id);
    if (!partyExist)
      throw new Error('Party not found');
    const wishlist = await this.wishlistService.getByPartyId(id);
    const list = await this.itemRepo.find({
      select: ["id","category_id","name","description", "quantity", "image"],
      where: [{ "party_id": wishlist.id }]
    });
    return list;
  }

  async partyExist(id: number) {
    return await this.wishlistService.partyExist(id);
  }

  async create(party_id: number, item: Item) {
    const e = await this.wishlistService.partyExist(party_id);
    if (!e)
      throw new Error('Party not found');
    const whishlist = await this.wishlistService.getByPartyId(party_id);
    const temp: Item = { ...item, party_id: whishlist.id};
    this.itemRepo.create(temp);
    return await this.itemRepo.save(this.itemRepo.create(temp));
  }

  async update(id: any,item:Item){
    await this.itemRepo.update(id,item);
  }

  async delete(id: any){
    await this.itemRepo.delete(id);
  }
}
