import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyController } from 'src/parties/controller/party.controller';
import { Party } from 'src/parties/entity/party.entity';
import { PartyService } from 'src/parties/service/party.service';
import { User } from 'src/users/entity/user.entity';
import { WishlistController } from 'src/wishlists/controller/whislist.controller';
import { Wishlist } from 'src/wishlists/entity/whislist.entity';
import { WishlistService } from 'src/wishlists/service/whislist.service';
import { ItemsController } from './controller/items.controller';
import { Item } from './entity/item.entity';
import { ItemsService } from './service/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item,Wishlist,Party, User])],
  providers: [ItemsService,WishlistService,PartyService],
  controllers: [ItemsController,WishlistController,PartyController],
})
export class ItemsModule {}
