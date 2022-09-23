import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from 'bcryptjs';
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

  // async login(email: string, password: string) {
  //   const user = await this.userRepo.findOneBy({ email: email });
  //   if (user == null)
  //     throw new BadRequestException('User not found');
  //   if (user.password. != password)
  //     throw new BadRequestException('Incorrect password');
  //   return user;
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email: email });
    if( user && await compare(password, user.password)){
      const { password, ...rest } = user;
      return rest;
    }
    return 'null';
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

    if ((await this.userRepo.findOneBy({ id: id })) == null)
      throw new BadRequestException('User not found');
    if ((await this.userRepo.findBy({ email : user.email })).length != 0 &&
    user.email != ((await this.userRepo.findOneBy({ id: id })).email)
    )
      throw new BadRequestException('User already registered with email');
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
