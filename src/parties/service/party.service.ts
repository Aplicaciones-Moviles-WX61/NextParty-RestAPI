import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/service.common";
import { Repository } from "typeorm";
import { Party } from "../entity/party.entity";

@Injectable()
export class PartyService extends BaseService<Party>{
  constructor(@InjectRepository(Party) private partyRepo: Repository<Party>) {
    super();
  }
  getRepository(): Repository<Party> {
    return this.partyRepo;
  }

  async getById(id: any) : Promise<Party>{
    const party = await this.partyRepo.find({
      select: ["name","description", "location", "date", "image"],
      where: [{ "id": id }]
    });
    if (party.length == 0)
      throw new BadRequestException('Party not found');
    return party[0];
  }

  async create(party: Party) {
    this.partyRepo.create(party);
    return await this.partyRepo.save(party);
  }

  async update(id: any, party:Party){
    const exist = await this.partyRepo.find({ select: ["id"], where: [{ "id": id }] });

    if (exist.length == 0)
      throw new BadRequestException('Party not found');

    await this.partyRepo.update(id,party);
  }

  async exists(id: number) {
    const party = await this.partyRepo.find({ select: ["id"], where: [{ "id": id }] });
    return party.length != 0;
  }
}
