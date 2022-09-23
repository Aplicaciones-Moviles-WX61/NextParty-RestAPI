import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsController } from "src/items/controller/items.controller";
import { Item } from "src/items/entity/item.entity";
import { ItemsService } from "src/items/service/items.service";
import { PartyController } from "src/parties/controller/party.controller";
import { Party } from "src/parties/entity/party.entity";
import { PartyService } from "src/parties/service/party.service";
import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { WishlistService } from "src/wishlists/service/whislist.service";
import { UserController } from "./controller/user.controller";
import { User } from "./entity/user.entity";
import { UserService } from "./service/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User,Party,Item,Wishlist])],
  providers : [UserService,PartyService,ItemsService,WishlistService],
  controllers: [UserController,PartyController,ItemsController],
})

export class UserModule{

}
