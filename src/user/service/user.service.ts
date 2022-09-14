import { BadRequestException, Injectable } from "@nestjs/common";
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

  async getById(id: any) : Promise<User>{
    const user = await this.userRepo.find({
      select: ["name", "lastname", "email", "password", "phone"],
      where: [{ "id": id }]
    });
    if (user.length == 0)
      throw new BadRequestException('User not found');
    return user[0];
  }

  async create(user: User) {
    const userExist = await this.userRepo.find({ select: ["email"], where: [{ "email": user.email }] });
    console.log(userExist);
    if (userExist.length > 0)
      throw new BadRequestException('User already registered with email');
    const newUser = this.userRepo.create(user);
    const temp = await this.userRepo.save(newUser);

    delete temp.password;
    return temp;
  }

  async update(id: any, user: User) {
    const userExist = await this.userRepo.find({ select: ["email"], where: [{ "email": user.email }] });
    console.log(userExist);
    if (userExist.length > 0)
      throw new BadRequestException('This email is already taken');

    await this.userRepo.update(id, user);
  }
}
