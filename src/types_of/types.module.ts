import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypesController } from './controller/item.controller';
import { TypeOfUserController } from './controller/user.controller';
import { ItemTypes, TypeOfUser } from './entity/types.entity';
import { ItemTypesService } from './service/item.service';
import { TypeOfUserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfUser,ItemTypes])],
  controllers: [ItemTypesController,TypeOfUserController],
  providers: [TypeOfUserService,ItemTypesService]
})
export class TypeModule {}
