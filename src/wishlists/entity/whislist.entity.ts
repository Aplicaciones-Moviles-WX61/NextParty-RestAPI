import { Item } from "src/items/entity/item.entity";
import { Party } from "src/parties/entity/party.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  party_id: number;

  @OneToOne(() => Party, (party) => party.id)
  party: Party;

  @OneToMany(() => Item, (item) => item.id)
  Items: Item[];

}
