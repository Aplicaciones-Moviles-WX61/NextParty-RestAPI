import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  party_id: number;

  @Column()
  category_id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  description: string;

  @Column()
  quantity: number;

  @Column({length: 100})
  image: string;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.id)
  @JoinColumn( {name: "party_id"} )
  wishlist: Wishlist;
}
