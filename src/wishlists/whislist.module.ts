import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyController } from "src/parties/controller/party.controller";
import { Party } from "src/parties/entity/party.entity";
import { PartyService } from "src/parties/service/party.service";
import { WishlistController } from "./controller/whislist.controller";
import { Wishlist } from "./entity/whislist.entity";
import { WishlistService } from "./service/whislist.service";

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist,Party])],
  providers : [WishlistService,PartyService],
  controllers: [WishlistController,PartyController]
})

export class WishlistModule{

}
