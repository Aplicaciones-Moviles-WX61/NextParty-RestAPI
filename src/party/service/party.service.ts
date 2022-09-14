import { Injectable } from "@nestjs/common";
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

}
