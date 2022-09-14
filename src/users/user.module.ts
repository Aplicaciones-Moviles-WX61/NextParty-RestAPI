import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controller/user.controller";
import { User } from "./entity/user.entity";
import { UserService } from "./service/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers : [UserService],
  controllers: [UserController],
})

export class UserModule{

}
