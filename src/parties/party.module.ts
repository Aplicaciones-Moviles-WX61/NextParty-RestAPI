import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/entity/item.entity";
import { UserController } from "src/users/controller/user.controller";
import { User } from "src/users/entity/user.entity";
import { UserService } from "src/users/service/user.service";
import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { PartyController } from "./controller/party.controller";
import { Party } from "./entity/party.entity";
import { PartyService } from "./service/party.service";

@Module({
  imports: [TypeOrmModule.forFeature([Party,User,Item,Wishlist])],
  providers : [PartyService,UserService],
  controllers: [PartyController,UserController],
})

export class PartyModule{

}
