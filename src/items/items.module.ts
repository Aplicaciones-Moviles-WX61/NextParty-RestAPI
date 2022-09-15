import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './controller/items.controller';
import { Item } from './entity/item.entity';
import { ItemsService } from './service/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
