import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/common/controler.common";
import { BaseService } from "src/common/service.common";
import { Party } from "../entity/party.entity";
import { PartyService } from "../service/party.service";


@ApiTags('Parties')
@Controller('parties')
export class PartyController extends BaseController<Party> {
  constructor(private readonly partyService: PartyService){
    super();
  }
  getService(): BaseService<Party>{
    return this.partyService;
  }
}
