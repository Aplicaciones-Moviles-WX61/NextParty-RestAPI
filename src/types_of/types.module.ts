import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controller/categories.controller';
import { RoleController } from './controller/roles.controller';
import { Categories, Roles } from './entity/types.entity';
import { CategoryService } from './service/categories.service';
import { RoleService } from './service/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles,Categories])],
  controllers: [RoleController,CategoryController],
  providers: [RoleService,CategoryService]
})
export class TypeModule {}
