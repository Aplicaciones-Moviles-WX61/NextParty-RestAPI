import { Party } from "src/parties/entity/party.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

}
