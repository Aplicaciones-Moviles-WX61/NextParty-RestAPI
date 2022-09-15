import { Wishlist } from "src/wishlists/entity/whislist.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 200})
  description: string;

  @Column({length: 100})
  location: string;

  @Column({type: 'datetime'})
  date: Date;

  @Column({length: 100})
  image: string;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.id)
  wishlist: Wishlist;
}
