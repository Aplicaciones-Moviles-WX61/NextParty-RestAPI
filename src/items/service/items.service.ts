import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from 'src/parties/entity/party.entity';
import { Wishlist } from 'src/wishlists/entity/whislist.entity';
import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';
@Injectable()
export class ItemsService{
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(Wishlist) private listRepo: Repository<Wishlist>,
    @InjectRepository(Party) private partyRepo: Repository<Party>) {
  }

  async getItemsList(party_id: number): Promise<Item[]> {
    if ((await this.partyRepo.findOneBy({id:party_id})) == null)
      throw new BadRequestException("Party not found");
    const list = await this.listRepo.findOneBy({party_id: party_id});
    if (list == null)
      throw new BadRequestException("This party does not have a wishlist");
    return await this.itemRepo.find({where: {party_id: list.id}});
  }

  async create(party_id: number, item: Item){
    if ((await this.partyRepo.findOneBy({id:party_id})) == null)
      throw new BadRequestException("Party not found");
    const list = await this.listRepo.findOneBy({party_id: party_id});
    if (list == null)
      throw new BadRequestException("This party does not have a wishlist");
    const _item = item;
    _item.party_id = list.id;
    list.Items = new Array<Item>();
    list.Items = await this.itemRepo.find({where: {party_id: list.id}});
    list.Items.push(_item);
    await this.listRepo.save(list);
    return await this.itemRepo.save(_item);
  }

  // async update(party_id: number, items: Item[]) {
  //   if ((await this.partyRepo.findOneBy({id:party_id})) == null)
  //     throw new BadRequestException("Party not found");
  //   const list = await this.listRepo.findOneBy({ party_id: party_id });
  //   if (list == null)
  //     throw new BadRequestException("This party does not have a wishlist");
  //   const _currentItems = await this.itemRepo.find({where: {party_id: list.id}});
  //   list.Items = items;
  //   for (let i = 0; i < list.Items.length; i++) {
  //     list.Items[i].party_id = list.id;
  //     await this.itemRepo.update(_currentItems[i].id,list.Items[i]);
  //   }
  //   return await this.itemRepo.find({where: {party_id: list.id}});
  // }

  async update(party_id: number, item_id: number, items: Item) {
    if ((await this.partyRepo.findOneBy({id:party_id})) == null)
      throw new BadRequestException("Party not found");
    const list = await this.listRepo.findOneBy({ party_id: party_id });
    if (list == null)
      throw new BadRequestException("This party does not have a wishlist");
    await this.itemRepo.update(item_id,items);
    return await this.itemRepo.find({where: {id: item_id}});
  }

  async deleteAll(party_id: number) {
    if ((await this.partyRepo.findOneBy({id:party_id})) == null)
      throw new BadRequestException("Party not found");
    const list = await this.listRepo.findOneBy({ party_id: party_id });
    if (list == null)
      throw new BadRequestException("This party does not have a wishlist");
    const _currentItems = await this.itemRepo.find({where: {party_id: list.id}});
    for (let i = 0; i < _currentItems.length; i++) {
      await this.itemRepo.delete(_currentItems[i].id);
    }
    return await this.itemRepo.find({where: {party_id: list.id}});

  }

  async deleteItem(party_id: number,item_id: number) {
    if ((await this.itemRepo.findOneBy({id:item_id})) == null)
      throw new BadRequestException("Item not found");
    const list = await this.listRepo.findOneBy({ party_id: party_id });
    const _currentItems = await this.itemRepo.find({where: {party_id: list.id}});
    for (let i = 0; i < _currentItems.length; i++) {
      if (_currentItems[i].id == item_id){
        return await this.itemRepo.delete(_currentItems[i].id);
      }
    }
    throw new BadRequestException("Item not found or cant be deleted");
  }

  // async partyExist(party_id: number) {
  //   return await this.wishlistService.partyExist(party_id);
  // }

  // async listExist(party_id: number) {
  //   return await this.wishlistService.listExist(party_id);
  // }

  // async getByPartyId(id: number) {
  //   const partyExist = await this.partyExist(id);
  //   if (!partyExist)
  //     throw new Error('Party not found');
  //   const wishlist = await this.wishlistService.getByPartyId(id);
  //   const list = await this.itemRepo.findBy({
  //      "party_id": wishlist.id
  //   });
  //   return list;
  // }

  // async create(party_id: number, item: Item) {
  //   const exists = await this.partyExist(party_id);
  //   if (!exists)
  //     throw new Error('Party not found');
  //   const whishlist = await this.wishlistService.getByPartyId(party_id);
  //   const temp: Item = { ...item, party_id: whishlist.id};
  //   return await this.itemRepo.save(this.itemRepo.create(temp));
  // }

  // async deleteAll(party_id: number) {
  //   if (!(await this.partyExist(party_id)))
  //     throw new Error('Party not found');
  //   if (!(await this.wishlistService.listExist(party_id)))
  //     throw new Error('Wishlist not created for this party');
  //   const wishlist = await this.wishlistService.getByPartyId(party_id);
  //   const items = await this.itemRepo.findBy({ "party_id": wishlist.id });
  //   for (const item of items) {
  //     await this.itemRepo.delete(item.id);
  //   }
  //   return "All items the wishlist have been deleted";
  // }
}
