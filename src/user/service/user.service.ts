import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/service.common";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService extends BaseService<User>{
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super();
  }
  getRepository(): Repository<User> {
    return this.userRepo;
  }

}
