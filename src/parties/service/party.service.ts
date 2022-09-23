import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Party } from "../entity/party.entity";

@Injectable()
export class PartyService{
  constructor(@InjectRepository(Party) private partyRepo: Repository<Party>) {
  }

  async getAll() : Promise<Party[]>{
    return await this.partyRepo.find();
  }

  async exists(id: number) {
    const party = await this.partyRepo.findOneBy({ "id": id  });
    return party != null; //
  }

  async getById(id: number) : Promise<Party>{
    const party = await this.partyRepo.findOneBy({
      id: id
    });
    return party;
  }

  async create(party: Party) {
    return await this.partyRepo.save(this.partyRepo.create(party));
  }

  async update(id: number, party:Party){
    const exist = await this.exists(id);
    if (exist)
      throw new BadRequestException('Party not found');

    await this.partyRepo.update(id,party);
  }

  async delete(id: number){
    const exist = await this.exists(id);
    if (exist)
      throw new BadRequestException('Party not found');
    await this.partyRepo.delete(id);
  }
}
