import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlitController } from "./controller/whislist.controller";
import { Whislist } from "./entity/whislist.entity";
import { WishlitService } from "./service/whislist.service";

@Module({
  imports: [TypeOrmModule.forFeature([Whislist])],
  providers : [WishlitService],
  controllers: [WishlitController],
})

export class WhislistModule{

}
