import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from 'bcryptjs';
import { Item } from "src/items/entity/item.entity";
import { Party } from "src/parties/entity/party.entity";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Party) private partyRepo: Repository<Party>,
    @InjectRepository(Item) private itemRepo: Repository<Item>
  ) {
  }

  async getAll() : Promise<User[]>{
    return await this.userRepo.find();
  }

  async getByEmail(email: string) : Promise<User> {
    const user =  await this.userRepo.findOneBy({ email: email });
    if (user == null)
      throw new BadRequestException('User not found');
    return user;
  }

  async getById(id: any) : Promise<User>{
    const user = await this.userRepo.findOneBy({
      id: id
    });
    if (user == null)
      throw new BadRequestException('User not found');
    return user;
  }

  async create(user: User) {
    const userExist = await this.userRepo.find({ select: ["email"], where: [{ "email": user.email }] });
    if (userExist.length > 0)
      throw new BadRequestException('User already registered with email');
    return await this.userRepo.save(this.userRepo.create(user));
  }

  async update(id: any, user: User) {
    const userExist = await this.userRepo.findOneBy({ id: id })
    if (!userExist)
      throw new BadRequestException('User not found');
    if ((await this.userRepo.findBy({ email : user.email })).length != 0 &&
        user.email != userExist.email)
      throw new BadRequestException('Email already taken');
    user.password = await hash(user.password, 10);
    await this.userRepo.update(id, user);
    return await this.userRepo.findOneBy({ id: id });
  }

  async delete(id: any) {
    const userExist = await this.userRepo.findOneBy({ "id": id });
    if (userExist == null)
      throw new BadRequestException('User not found');
    await this.userRepo.delete(id);
  }

  async createParty(id: number, party: Party) {
    const user = await this.userRepo.findOneBy({id:id});
    if (user == null)
      throw new BadRequestException('User not found');
    party.users = [user];
    return await this.partyRepo.save(this.partyRepo.create(party));
  }

  async checkItem(id: number, item_d: number) {
    const user = await this.userRepo.findOneBy({id:id});
    if (user == null)
      throw new BadRequestException('User not found');
    user.items = [await this.itemRepo.findOneBy({id:item_d})];
    return await this.userRepo.save(user);
  }
}
