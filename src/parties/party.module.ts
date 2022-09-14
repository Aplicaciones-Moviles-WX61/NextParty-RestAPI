import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyController } from "./controller/party.controller";
import { Party } from "./entity/party.entity";
import { PartyService } from "./service/party.service";

@Module({
  imports: [TypeOrmModule.forFeature([Party])],
  providers : [PartyService],
  controllers: [PartyController],
})

export class PartyModule{

}
